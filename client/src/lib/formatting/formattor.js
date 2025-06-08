/**
 * Format angka menjadi mata uang Rupiah (Indonesia).
 * @param {number} amount - Jumlah yang akan diformat.
 * @returns {string} - String yang diformat dalam Rupiah.
 */
export const formatRupiah = (amount) => {
  if (typeof amount !== 'number') {
    console.warn(`formatRupiah: expected a number, but got ${typeof amount}`);
    return 'Rp-';
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format tanggal menjadi string lokal Indonesia (contoh: 12 Jan 2024).
 * @param {string | Date} date - Tanggal yang akan diformat (bisa string ISO atau objek Date).
 * @param {object} options - Opsi format (sesuai dengan Intl.DateTimeFormatOptions).
 * @returns {string} - String tanggal yang diformat.
 */
export const formatDate = (date, options) => {
  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      console.warn(`formatDate: invalid date - ${date}`);
      return '-';
    }
    const defaultOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const formatOptions = { ...defaultOptions, ...options };
    return dateObj.toLocaleDateString('id-ID', formatOptions);
  } catch (error) {
    console.error(`formatDate error: ${error.message}, input: ${date}`);
    return '-';
  }
};