export class BuddyAllocator {
    _data: ArrayBuffer
    FreeListMap: Map<number, number[]>
    smallestblocksize = 1
    largestblocksize: number
    size: number

    constructor(sizeInPowerOf2: number) {
        this.size = 1 << sizeInPowerOf2
        this.largestblocksize = 1 << sizeInPowerOf2
        this._data = new ArrayBuffer(this.size)
        this.FreeListMap = new Map<number, number[]>()
        const initialList: number[] = [0]
        this.FreeListMap.set(this.size, initialList)
    }

    allocate(size: number): DataView | null {
        const smallestBlockNeeded = 1 << Math.ceil(Math.log2(size))
        if (this.FreeListMap.has(smallestBlockNeeded)) {
            const addr = this.FreeListMap.get(smallestBlockNeeded)![0]
            this.FreeListMap.get(smallestBlockNeeded)!.shift()
            return new DataView(this._data, addr, smallestBlockNeeded)
        } else {
            this.breakBlocksIntoLargerPieces(smallestBlockNeeded)
            if (!this.FreeListMap.has(smallestBlockNeeded)) {
                return null
            }

            const addr = this.FreeListMap.get(smallestBlockNeeded)![0]
            this.FreeListMap.get(smallestBlockNeeded)!.shift()
            return new DataView(this._data, addr, smallestBlockNeeded)
        }
    }

    breakBlocksIntoLargerPieces(startingBlock: number) {
        let currBlock = startingBlock
        console.log("largest: " + this.largestblocksize)
        while(currBlock < this.largestblocksize && !this.FreeListMap.has(currBlock)) {
            currBlock *= 2
        }

        console.log("currBlock: " + currBlock)

        if (!this.FreeListMap.has(currBlock)) {
            // unable to split
            return;
        }

        while(currBlock != startingBlock) {
            const addr = this.FreeListMap.get(currBlock)![0]
            this.FreeListMap.get(currBlock)?.shift()
            if(this.FreeListMap.get(currBlock)?.length === 0) {
                this.FreeListMap.delete(currBlock)
            }

            if (this.FreeListMap.get(currBlock/2) === undefined) {
                this.FreeListMap.set(currBlock/2, [])
            }

            this.FreeListMap.get(currBlock/2)?.push(addr)
            this.FreeListMap.get(currBlock/2)?.push(addr + currBlock/2)

            currBlock /= 2
        }
    }

    free(addr: number, size: number) {
        const smallestBlockNeeded = 1 << Math.ceil(Math.log2(size)) 
        if (!this.FreeListMap.has(smallestBlockNeeded)) {
            this.FreeListMap.set(smallestBlockNeeded, [addr])
            return;
        }

        let currBlock = smallestBlockNeeded

        // Merge adjacent free blocks if possible
        while (currBlock < this.largestblocksize) {
            const buddy = addr ^ currBlock; // XOR to find buddy
            const buddyIndex = this.FreeListMap.get(currBlock)?.indexOf(buddy);
            console.log("currBlock: " + currBlock + " buddy: " + buddy + " buddy index: " + buddyIndex)

            if (buddyIndex === -1 || buddyIndex === undefined) break;

            this.FreeListMap.get(currBlock)?.splice(buddyIndex!, 1); // Remove buddy from free list

            if (this.FreeListMap.get(currBlock)?.length === 0) {
                this.FreeListMap.delete(currBlock)
            }

            addr = Math.min(addr, buddy);
            currBlock *= 2;
        }

        if(!this.FreeListMap.has(currBlock)) {
            this.FreeListMap.set(currBlock, [])
        }

        console.log("inserting into block size: " + currBlock + " addr is: " + addr)
        this.FreeListMap.get(currBlock)?.push(addr)
    }
}