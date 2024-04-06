import { BuddyAllocator } from '../buddyallocator'
describe('basic buddy allocator tests', () => {
    test('basic allocate and free', async () => {
        // 2^32
        const allocator = new BuddyAllocator(16);
        const ptr1 = allocator.allocate(32); // Allocate a 32-byte block
        const ptr2 = allocator.allocate(16); // Allocate a 16-byte block
        console.log("Allocated ptr1:", ptr1);
        console.log("Allocated ptr2:", ptr2);
        // allocator.free(ptr1!.byteOffset, 32); // Free the previously allocated block
        allocator.free(ptr2!.byteOffset, 16); // Free the previously allocated block
        const ptr3 = allocator.allocate(8990);
        console.log("Allocated ptr3:", ptr3); 
    })
})