import crypto from "crypto";

const tokens = new Map();

function generateToken(nama) {
  const token = crypto.randomBytes(24).toString("hex");
  tokens.set(token, {
    nama,
    expire: Date.now() + 60 * 60 * 1000 // 1 JAM
  });
  return token;
}

export default function handler(req, res) {
  const { nama, token } = req.query;

  if (nama && !token) {
    const newToken = generateToken(nama.toLowerCase());
    return res.json({ token: newToken });
  }

  if (!token || !tokens.has(token)) {
    return res.status(403).json({ valid: false });
  }

  const data = tokens.get(token);

  if (Date.now() > data.expire) {
    tokens.delete(token);
    return res.status(403).json({ valid: false });
  }

  return res.json({ valid: true, nama: data.nama });
}
