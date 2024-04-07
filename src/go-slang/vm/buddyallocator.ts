export class BuddyAllocator {
    _data: ArrayBuffer
    FreeList: Map<number, number[]>
    smallestblocksize = 1
    largestblocksize: number
    size: number

    constructor(sizeInPowerOf2: number) {
        this.size = 1 << sizeInPowerOf2
        this.largestblocksize = 1 << sizeInPowerOf2
        this._data = new ArrayBuffer(this.size)
        this.initializeFreeList()
    }

    initializeFreeList() {
        this.FreeList = new Map<number, number[]>()
        for(let i = 1; i <= this.size; i *= 2) {
            this.FreeList.set(i, [])
        }
        this.FreeList.get(this.size)?.push(0)
    }

    hasBlockOfSize(blockSizeNeeded: number): boolean {
        return this.FreeList.get(blockSizeNeeded)!.length > 0
    }

    allocate(size: number): DataView | null {
        if (size > this.largestblocksize) {
            return null
        }


        const smallestBlockNeeded = 1 << Math.ceil(Math.log2(size))
        if (this.hasBlockOfSize(smallestBlockNeeded)) {
            const addr = this.FreeList.get(smallestBlockNeeded)![0]
            this.FreeList.get(smallestBlockNeeded)!.shift()
            return new DataView(this._data, addr, smallestBlockNeeded)
        } else {
            this.breakBlocksIntoLargerPieces(smallestBlockNeeded)
            if (!this.hasBlockOfSize(smallestBlockNeeded)) {
                return null
            }

            const addr = this.FreeList.get(smallestBlockNeeded)![0]
            this.FreeList.get(smallestBlockNeeded)!.shift()
            return new DataView(this._data, addr, smallestBlockNeeded)
        }
    }

    breakBlocksIntoLargerPieces(startingBlock: number) {
        let currBlock = startingBlock
        // console.log("largest: " + this.largestblocksize)
        while(currBlock < this.largestblocksize && !this.hasBlockOfSize(currBlock)) {
            currBlock *= 2
        }

        // console.log("currBlock: " + currBlock)

        if (!this.hasBlockOfSize(currBlock)) {
            // unable to split
            return;
        }

        while(currBlock != startingBlock) {
            const addr = this.FreeList.get(currBlock)![0]
            this.FreeList.get(currBlock)!.shift()

            this.FreeList.get(currBlock/2)!.push(addr)
            this.FreeList.get(currBlock/2)!.push(addr + currBlock/2)

            currBlock /= 2
        }
    }

    free(addr: number, size: number) {
        const smallestBlockNeeded = 1 << Math.ceil(Math.log2(size)) 

        let currBlock = smallestBlockNeeded

        // Merge adjacent free blocks if possible
        while (currBlock < this.largestblocksize) {
            const buddy = addr ^ currBlock; // XOR to find buddy
            const buddyIndex = this.FreeList.get(currBlock)!.indexOf(buddy);

            // console.log("currBlock: " + currBlock + " buddy: " + buddy + " buddy index: " + buddyIndex)

            if (buddyIndex === -1 || buddyIndex === undefined) break;

            this.FreeList.get(currBlock)!.splice(buddyIndex!, 1); // Remove buddy from free list

            addr = Math.min(addr, buddy);
            currBlock *= 2;
        }

        // console.log("inserting into block size: " + currBlock + " addr is: " + addr)
        this.FreeList.get(currBlock)!.push(addr)
    }
}