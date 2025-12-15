import fs from "fs";
import path from "path";
import XLSX from "xlsx";

export default function handler(req, res) {
  const nama = (req.query.nama || "").toLowerCase();

  if (!nama) {
    return res.status(400).json({ error: "Nama kosong" });
  }

  const filePath = path.join(process.cwd(), "private", "data.xlsx");

  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  const siswa = {};
  data.forEach(row => {
    siswa[row.Nama.toLowerCase()] = row.Hasil;
  });

  return res.json({
    hasil: siswa[nama] || "Data tidak ditemukan"
  });
}
