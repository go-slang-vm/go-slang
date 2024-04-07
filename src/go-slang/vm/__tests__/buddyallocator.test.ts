import { BuddyAllocator } from '../buddyallocator'
describe('basic buddy allocator tests', () => {
    test('basic allocate and free', async () => {
        // 2^16
        const allocator = new BuddyAllocator(16);
        const ptr1 = allocator.allocate(28); // Allocate a 32-byte block
        const ptr2 = allocator.allocate(14); // Allocate a 16-byte block
        expect(ptr1?.byteOffset).toBe(0)
        expect(ptr1?.byteLength).toBe(32)
        expect(ptr2?.byteOffset).toBe(32)
        expect(ptr2?.byteLength).toBe(16)

        /*
        The list should look like this now:
        16: []
        15: [32768]
        14: [16384]
        13: [8192]
        12: [4096]
        11: [2048]
        10: [1024]
        9: [512]
        8: [256]
        7: [128]
        6: [64]
        5: []
        4: [48]
        3: []
        2: []
        1: []
        0: []
        */
       
        expect(allocator.FreeList.get(1 << 16)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 15)).toStrictEqual([32768])
        expect(allocator.FreeList.get(1 << 14)).toStrictEqual([16384])
        expect(allocator.FreeList.get(1 << 13)).toStrictEqual([8192])
        expect(allocator.FreeList.get(1 << 12)).toStrictEqual([4096])
        expect(allocator.FreeList.get(1 << 11)).toStrictEqual([2048])
        expect(allocator.FreeList.get(1 << 10)).toStrictEqual([1024])
        expect(allocator.FreeList.get(1 << 9)).toStrictEqual([512])
        expect(allocator.FreeList.get(1 << 8)).toStrictEqual([256])
        expect(allocator.FreeList.get(1 << 7)).toStrictEqual([128])
        expect(allocator.FreeList.get(1 << 6)).toStrictEqual([64])
        expect(allocator.FreeList.get(1 << 5)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 4)).toStrictEqual([48])
        expect(allocator.FreeList.get(1 << 3)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 2)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 1)).toStrictEqual([])

        allocator.free(ptr2!.byteOffset, ptr2!.byteLength); // Free the previously allocated block
        /*
        The list should look like this now:
        16: []
        15: [32768]
        14: [16384]
        13: [8192]
        12: [4096]
        11: [2048]
        10: [1024]
        9: [512]
        8: [256]
        7: [128]
        6: [64]
        5: [32]
        4: []
        3: []
        2: []
        1: []
        0: []
        */
       
        expect(allocator.FreeList.get(1 << 16)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 15)).toStrictEqual([32768])
        expect(allocator.FreeList.get(1 << 14)).toStrictEqual([16384])
        expect(allocator.FreeList.get(1 << 13)).toStrictEqual([8192])
        expect(allocator.FreeList.get(1 << 12)).toStrictEqual([4096])
        expect(allocator.FreeList.get(1 << 11)).toStrictEqual([2048])
        expect(allocator.FreeList.get(1 << 10)).toStrictEqual([1024])
        expect(allocator.FreeList.get(1 << 9)).toStrictEqual([512])
        expect(allocator.FreeList.get(1 << 8)).toStrictEqual([256])
        expect(allocator.FreeList.get(1 << 7)).toStrictEqual([128])
        expect(allocator.FreeList.get(1 << 6)).toStrictEqual([64])
        expect(allocator.FreeList.get(1 << 5)).toStrictEqual([32])
        expect(allocator.FreeList.get(1 << 4)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 3)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 2)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 1)).toStrictEqual([])

        const ptr3 = allocator.allocate(8990);
        expect(ptr3?.byteOffset).toBe(16384)
        expect(ptr3?.byteLength).toBe(16384)

        /*
        The list should look like this now:
        16: []
        15: [32768]
        14: []
        13: [8192]
        12: [4096]
        11: [2048]
        10: [1024]
        9: [512]
        8: [256]
        7: [128]
        6: [64]
        5: [32]
        4: []
        3: []
        2: []
        1: []
        0: []
        */
       
        expect(allocator.FreeList.get(1 << 16)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 15)).toStrictEqual([32768])
        expect(allocator.FreeList.get(1 << 14)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 13)).toStrictEqual([8192])
        expect(allocator.FreeList.get(1 << 12)).toStrictEqual([4096])
        expect(allocator.FreeList.get(1 << 11)).toStrictEqual([2048])
        expect(allocator.FreeList.get(1 << 10)).toStrictEqual([1024])
        expect(allocator.FreeList.get(1 << 9)).toStrictEqual([512])
        expect(allocator.FreeList.get(1 << 8)).toStrictEqual([256])
        expect(allocator.FreeList.get(1 << 7)).toStrictEqual([128])
        expect(allocator.FreeList.get(1 << 6)).toStrictEqual([64])
        expect(allocator.FreeList.get(1 << 5)).toStrictEqual([32])
        expect(allocator.FreeList.get(1 << 4)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 3)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 2)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 1)).toStrictEqual([])

        allocator.free(ptr1!.byteOffset, ptr1!.byteLength); // Free the previously allocated block
        /*
        The list should look like this now:
        16: []
        15: [32768]
        14: [0]
        13: []
        12: []
        11: []
        10: []
        9: []
        8: []
        7: []
        6: []
        5: []
        4: []
        3: []
        2: []
        1: []
        0: []
        */
       
        expect(allocator.FreeList.get(1 << 16)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 15)).toStrictEqual([32768])
        expect(allocator.FreeList.get(1 << 14)).toStrictEqual([0])
        expect(allocator.FreeList.get(1 << 13)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 12)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 11)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 10)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 9)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 8)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 7)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 6)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 5)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 4)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 3)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 2)).toStrictEqual([])
        expect(allocator.FreeList.get(1 << 1)).toStrictEqual([])

        expect(allocator.allocate(1<<16)).toBe(null)
    })
})