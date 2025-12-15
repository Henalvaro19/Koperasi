import fs from "fs";
import path from "path";
import crypto from "crypto";

// TOKEN SEMENTARA (RAM)
const tokens = new Map();

// helper buat token
function generateToken(nama) {
  const token = crypto.randomBytes(16).toString("hex");
  tokens.set(token, {
    nama,
    expire: Date.now() + 5 * 60 * 1000 // 5 menit
  });
  return token;
}

export default function handler(req, res) {
  const { token, nama } = req.query;

  // REQUEST TOKEN BARU
  if (nama && !token) {
    const newToken = generateToken(nama.toLowerCase());
    return res.json({ token: newToken });
  }

  // VALIDASI TOKEN
  if (!tokens.has(token)) {
    return res.status(403).send("Forbidden");
  }

  const data = tokens.get(token);
  if (Date.now() > data.expire) {
    tokens.delete(token);
    return res.status(403).send("Token expired");
  }

  // TOKEN SEKALI PAKAI
  tokens.delete(token);

  // KIRIM QR
  const filePath = path.join(process.cwd(), "private/qrcode.png");
  const image = fs.readFileSync(filePath);

  res.setHeader("Content-Type", "image/png");
  res.send(image);
}
