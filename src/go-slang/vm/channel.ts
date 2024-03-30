export class Channel {
    idx: number
    capacity: number
    items: number[]

    constructor(idx: number, capacity: number) {
        this.idx = idx;
        this.capacity = capacity;
        this.items = [];
    }

    push(item: number) {
        this.items.push(item);
    }

    pop(): number {
        if(this.items.length == 0) {
            throw new Error("Channel is empty should not have been popped");
        }
        return this.items.shift() as number;
    }
}