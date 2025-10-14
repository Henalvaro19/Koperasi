// Format: new Date(tahun, bulan-1, tanggal, jam, menit, detik)
const launchDate = new Date(2025, 9, 14, 11, 0, 0);
localStorage.setItem("launchDate", launchDate.toISOString());
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function updateCountdown() {
  const now = new Date();
  const diff = launchDate - now;

  if (diff <= 0) {
    window.location.href = "isi.html";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  daysEl.textContent = d.toString().padStart(2, '0');
  hoursEl.textContent = h.toString().padStart(2, '0');
  minutesEl.textContent = m.toString().padStart(2, '0');
  secondsEl.textContent = s.toString().padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);
