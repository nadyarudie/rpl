import { isNotEmpty, isPositiveNumber, isValidDate } from "@/lib/validation/validator";

export function validateTransaction(form) {
  const errors = {};
  let valid = true;

  if (!form.type) {
    errors.type = "Jenis transaksi harus dipilih.";
    valid = false;
  }

  if (!isNotEmpty(form.title)) {
    errors.title = "Judul transaksi tidak boleh kosong.";
    valid = false;
  }

  if (!form.amount || !isPositiveNumber(Number(form.amount))) {
    errors.amount = "Jumlah harus berupa angka positif.";
    valid = false;
  }

  if (!form.date || !isValidDate(form.date)) {
    errors.date = "Format tanggal tidak valid (YYYY-MM-DD).";
    valid = false;
  }

  return { valid, errors };
}
