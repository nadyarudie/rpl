/**
 * Memvalidasi apakah sebuah string kosong atau tidak.
 * @param {string} value - String yang akan divalidasi.
 * @returns {boolean} - True jika string tidak kosong, false jika kosong.
 */
export const isNotEmpty = (value) => {
  return value.trim().length > 0;
};

/**
 * Memvalidasi apakah sebuah nilai adalah angka positif.
 * @param {number} value - Nilai yang akan divalidasi.
 * @returns {boolean} - True jika angka positif, false jika tidak.
 */
export const isPositiveNumber = (value) => {
  return typeof value === 'number' && value > 0;
};

/**
 * Validasi format tanggal YYYY-MM-DD.
 * @param {string} dateString
 * @returns {boolean}
 */
export const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  const timestamp = date.getTime();

  if (typeof timestamp !== 'number' || isNaN(timestamp)) {
    return false;
  }

  return date.toISOString().startsWith(dateString);
};