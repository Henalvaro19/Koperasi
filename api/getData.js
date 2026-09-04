import fs from "fs";
import path from "path";
import XLSX from "xlsx";

export default function handler(req, res) {
  const nama = (req.query.nama || "").trim().toLowerCase();

  if (!nama) {
    return res.status(400).json({ error: "Nama kosong" });
  }

  const filePath = path.join(process.cwd(), "private", "data.xlsx");

  if (!fs.existsSync(filePath)) {
    return res.status(500).json({ error: "File data tidak ditemukan" });
  }

  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  const siswa = {};
  data.forEach(row => {
    const rowNama = row.NAMA || row.Nama;
    const rowHasil = row.HASIL || row.Hasil;
    if (rowNama) {
      siswa[String(rowNama).trim().toLowerCase()] = rowHasil;
    }
  });

  return res.json({
    hasil: siswa[nama] ?? null
  });
}

