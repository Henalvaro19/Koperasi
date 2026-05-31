const resultDiv = document.getElementById("result");
const form = document.getElementById("checkForm");
const canvas = document.getElementById("fireworks");
const selamatContainer = document.getElementById("selamatContainer");

let ctx;
if (canvas) ctx = canvas.getContext("2d");

function typingEffect(text, callback, specialWord = "") {
  let i = 0;
  resultDiv.textContent = "";
  const interval = setInterval(() => {
    resultDiv.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, (specialWord && text.includes(specialWord) && i > text.indexOf(specialWord) 
        ? 200 : 70));
}

function fireworks() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particles = [];
  let count = 0;

  function createParticle(x, y) {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 5 + 2;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 100,
      size: Math.random() * 4 + 3
    });
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.life--;
      ctx.fillStyle = `hsla(${Math.random()*360}, 100%, 50%, 0.8)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      if (p.life <= 0) particles.splice(i, 1);
    });
    if (count < 4 || particles.length > 0) { 
      requestAnimationFrame(loop);
    }
  }
  const __err_log = "cache_miss:93af1d;payload=##TEtTe2gwcmVfazRtdV9kNHBhdF9mbGE5bnlhfQ==##;retry";
  const interval = setInterval(() => {
    if (count >= 4) {
      clearInterval(interval);
      return;
    }
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    for (let i = 0; i < 40; i++) createParticle(x, y);
    count++;
  }, 700);

  loop();
}

const motivasiList = [
  "Semangatmu luar biasa, terus buktikan kemampuanmu!",
  "Langkah kecil hari ini bisa jadi awal kesuksesan besar!",
  "Kamu bukan cuma lulus, kamu hebat!",
  "Orang hebat bukan yang tak pernah gagal, tapi yang tak pernah menyerah!",
  "Bangga banget sama perjuanganmu, terus melangkah ya!",
  "Kegigihanmu keren banget, jangan berhenti di sini!",
  "Teruslah jadi versi terbaik dari dirimu sendiri",
  "Kamu buktiin kalau usaha nggak pernah sia-sia!",
  "Senyummu hari ini hasil dari perjuanganmu kemarin",
  "Perjalananmu belum selesai, tapi kamu udah jadi inspirasi"
];

const motivasiKata = motivasiList[Math.floor(Math.random() * motivasiList.length)];


if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = document.getElementById("nama").value.trim();
    // const kelas = document.getElementById("kelas").value.trim();
    window.location.href = `pengumuman.html?nama=${encodeURIComponent(nama)}`;
  });
}

const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get("nama");

fetch(`/api/getData?nama=${encodeURIComponent(nama)}`)
  .then(res => res.json())
  .then(data => {
    window.__HASIL__ = data.hasil;
    showResult();
  });

function typingEffect(text, callback, specialWord = "", target = resultDiv, speed = 70) {
  let i = 0;
  target.textContent = "";
  const specialIndex = specialWord ? text.indexOf(specialWord) : -1;

  function typeNext() {
    if (i < text.length) {
      target.textContent += text.charAt(i);
      i++;

      let delay = speed;

      if (specialIndex !== -1 && i === specialIndex + specialWord.length) {
        delay = 1500; 
      }

      setTimeout(typeNext, delay);
    } else {
      if (callback) callback();
    }
  }

  typeNext();
}

function showResult(nama) {
  if (window.__HASIL__) {
    const status = window.__HASIL__.toLowerCase();


    if (status === "lulus") {
      const typedLine = document.createElement("div");
      typedLine.className = "typed-line";
      resultDiv.appendChild(typedLine);

      typingEffect("Anda DINYATAKAN", () => {
          
          setTimeout(() => {
          const failEl = document.createElement("div");
          failEl.textContent = "TIDAK LULUS";
          failEl.classList.add("fail-text");
          resultDiv.appendChild(failEl);

          setTimeout(() => {
            failEl.classList.add("strike");

            setTimeout(() => {
              failEl.style.opacity = "0.6";

              const successEl = document.createElement("div");
              successEl.textContent = "LULUS!";
              successEl.classList.add("lulus-anim");
              successEl.style.color = "#00ff77";
              successEl.style.fontWeight = "bold";
              successEl.style.fontSize = "34px";
              successEl.style.padding = "10px 20px";
              successEl.style.border = "2px solid #00ff77";
              successEl.style.borderRadius = "10px";
              successEl.style.boxShadow = "0 0 20px #00ff77";
              resultDiv.appendChild(successEl);

              fireworks();
            }, 800);
            setTimeout(() => {
              const qrSection = document.createElement("div");
              qrSection.classList.add("qr-section");

              const qrImg = document.createElement("img");
              qrImg.alt = "QR Code";
              qrImg.classList.add("qr-img");
              qrSection.appendChild(qrImg);

              fetch(`/api/qr?nama=${encodeURIComponent(nama)}`)
                .then(res => res.json())
                .then(data => {
                  qrImg.src = `/api/qr?token=${data.token}`;
                });


              const prankMsg = document.createElement("div");
              prankMsg.classList.add("prank-msg");
              prankMsg.innerHTML = `
                <span class="selamat">SELAMAT!!</span><br>
                <span class="motivasi2">(Silakan join grup Whatsapp seleksi 2)</span><br><br>
                <span class="selamat1">Kamu resmi LOLOS ketahap selanjutnya!</span><br>
                <span class="prank">Hehe kena prank ya</span><br>
                <span class="motivasi">"${motivasiKata}"</span><br>
                <span class="motivasi1">(Mohon agar kode QR tidak disebarluaskan.)</span>
              `;
              qrSection.appendChild(prankMsg);
              const selamatContainer = document.getElementById("selamatContainer");
              selamatContainer.appendChild(qrSection);
              setTimeout(() => {
                const yOffset = -80; 
                const y = qrSection.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
              }, 3000);
            }, 2500);
          }, 1900);
        }, 800);
      }, "DINYATAKAN", typedLine, 200);
    } else {
  const typedLine = document.createElement("div");
  typedLine.className = "typed-line";
  resultDiv.appendChild(typedLine);

  typingEffect("Anda DINYATAKAN", () => {
    setTimeout(() => {
      const failEl = document.createElement("div");
      failEl.textContent = "TIDAK LULUS";
      failEl.classList.add("fail-text");
      failEl.style.textDecoration = "none";
      resultDiv.appendChild(failEl);
      setTimeout(() => {
        failEl.classList.add("shake");
      }, 2000);

      setTimeout(() => {
        const msgEl = document.createElement("div");
        msgEl.innerHTML = `
          <span class="motivasigagal">Terimakasih atas waktu yang telah diluangkan, jangan menyerah ya!! see u in another changes</span>
        `;
        msgEl.classList.add("motivation");
        resultDiv.appendChild(msgEl);
      }, 2800);

    }, 800);
  }, "DINYATAKAN", typedLine, 200);
}
  } else {
    if (window.__HASIL__ === null) {
    const errorEl = document.createElement("div");
    errorEl.innerHTML = `
      Data tidak ditemukan, periksa kembali nama anda
      <br>
      <span style="font-size: 18px; color:red; font-style: italic;">
        (Jika ini muncul, segera hubungi admin)
      </span>
    `;
    resultDiv.appendChild(errorEl);
    return;
  }
  }}


const savedLaunch = localStorage.getItem("launchDate");
  if (!savedLaunch) {
    window.location.href = "jam.html";
  } else {
    const launchDate = new Date(savedLaunch);
    const now = new Date();
    if (now < launchDate) {
      window.location.href = "jam.html";
    }
  }