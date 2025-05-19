import React from "react";
import { Plus, CalendarIcon } from "lucide-react";
import { isNotEmpty, isPositiveNumber, isValidDate } from "../lib/validator";
import { formatRupiah } from "../lib/formattor";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { format } from "date-fns";

// Helper konversi Date ke string YYYY-MM-DD
function toYMD(date) {
  if (!date) return "";
  const d = new Date(date);
  const mm = (d.getMonth() + 1).toString().padStart(2, "0");
  const dd = d.getDate().toString().padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export default function AddTransactionModal({
  setShowModal,
  apiError,
  addTransaction,
  form,
  setForm,
}) {
  const { valid, errors } = validateTransaction(form);

  function validateTransaction(form) {
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

  // Untuk Calendar shadcn/ui
  const selectedDate = form.date ? new Date(form.date) : undefined;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-xl p-6 lg:p-8 w-full max-w-md shadow-2xl transition-transform duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">
            Tambah Transaksi Baru
          </h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-slate-400 hover:text-slate-600"
            aria-label="Tutup"
          >
            <Plus size={28} className="rotate-45" />
          </button>
        </div>

        {apiError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-600 rounded-md text-sm">
            {apiError}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (valid) addTransaction(e);
          }}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Jenis
            </label>
            <select
              id="type"
              className="w-full border-slate-300 rounded-md shadow-sm px-3 py-2"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-xs text-red-500">{errors.type}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Judul
            </label>
            <input
              id="title"
              type="text"
              className="w-full border-slate-300 rounded-md shadow-sm px-3 py-2"
              placeholder="cth: Gaji bulanan"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Jumlah (Rp)
            </label>
            <input
              id="amount"
              type="number"
              className="w-full border-slate-300 rounded-md shadow-sm px-3 py-2"
              placeholder="0"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
            {errors.amount && (
              <p className="mt-1 text-xs text-red-500">{errors.amount}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Tanggal
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={
                    "w-full justify-start text-left font-normal " +
                    (!selectedDate && "text-muted-foreground")
                  }
                  type="button"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate
                    ? format(selectedDate, "yyyy-MM-dd")
                    : "Pilih tanggal"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-[9999]" align="center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setForm({
                      ...form,
                      date: date ? toYMD(date) : "",
                    });
                  }}
                  initialFocus
                  fromYear={2022}
                  toYear={2032}
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <p className="mt-1 text-xs text-red-500">{errors.date}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!valid}
            className={`w-full py-2.5 px-4 rounded-md font-semibold text-white
                ${
                  valid
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
          >
            {valid
              ? `Simpan (${formatRupiah(Number(form.amount) || 0)})`
              : "Perbaiki Form"}
          </button>
        </form>
      </div>
    </div>
  );
}
