/**
 * Menghitung total dari array angka.
 * @param {number[]} numbers - Array angka yang akan dijumlahkan.
 * @returns {number} - Total dari array.
 */
export const sum = (numbers) => {
    if (!Array.isArray(numbers)) {
        console.warn(`sum: expected an array, but got ${typeof numbers}`);
        return 0;
    }
    return numbers.reduce((acc, curr) => acc + curr, 0);
};

/**
 * Menghitung rata-rata dari array angka.
 * @param {number[]} numbers - Array angka.
 * @returns {number} - Rata-rata dari array.
 */
export const average = (numbers) => {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return 0;
    }
    return sum(numbers) / numbers.length;
};