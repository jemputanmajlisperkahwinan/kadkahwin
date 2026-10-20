const openButton = document.getElementById("openInvitation");
const envelopeWrap = document.getElementById("envelopeWrap");
const envelopeScreen = document.getElementById("envelopeScreen");
const invitation = document.getElementById("invitation");
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const shareButton = document.getElementById("shareButton");
const shareNote = document.getElementById("shareNote");

openButton.addEventListener("click", async () => {
  envelopeWrap.classList.add("open");
  // Browser biasanya membenarkan audio bermula selepas tindakan pengguna ini.
  // Pastikan fail music.mp3 berada dalam folder yang sama dengan index.html.
  try {
    music.volume = 0.38;
    await music.play();
    musicToggle.innerHTML = "♫ <span>Muzik: ON</span>";
    musicToggle.setAttribute("aria-label", "Matikan muzik latar");
  } catch (error) {
    // Jika fail belum ditambah atau autoplay disekat, butang muzik masih tersedia.
    musicToggle.innerHTML = "♫ <span>Muzik</span>";
  }
  openButton.disabled = true;
  openButton.textContent = "Jemputan dibuka";
  window.setTimeout(() => {
    envelopeScreen.classList.add("hidden");
    invitation.classList.remove("hidden");
    musicToggle.classList.remove("hidden");
    window.scrollTo({top: 0, behavior: "smooth"});
  }, 900);
});

const eventDate = new Date("2026-12-13T11:00:00+08:00").getTime();
function updateCountdown() {
  const now = Date.now();
  const distance = eventDate - now;
  const safeDistance = Math.max(0, distance);
  document.getElementById("days").textContent = String(Math.floor(safeDistance / 86400000)).padStart(3, "0");
  document.getElementById("hours").textContent = String(Math.floor((safeDistance % 86400000) / 3600000)).padStart(2, "0");
  document.getElementById("minutes").textContent = String(Math.floor((safeDistance % 3600000) / 60000)).padStart(2, "0");
  document.getElementById("seconds").textContent = String(Math.floor((safeDistance % 60000) / 1000)).padStart(2, "0");
}
updateCountdown();
window.setInterval(updateCountdown, 1000);

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.innerHTML = "♫ <span>Muzik: ON</span>";
      musicToggle.setAttribute("aria-label", "Matikan muzik latar");
    } catch (error) {
      shareNote.textContent = "Untuk mengaktifkan muzik, tambah fail music.mp3 ke folder website dahulu.";
    }
  } else {
    music.pause();
    musicToggle.innerHTML = "♫ <span>Muzik: OFF</span>";
    musicToggle.setAttribute("aria-label", "Hidupkan muzik latar");
  }
});

shareButton.addEventListener("click", async () => {
  const shareData = {
    title: "Jemputan Walimah Siti Norhasliza & Jamirul Hisham",
    text: "Dengan penuh kesyukuran, kami menjemput Tuan/Puan seisi keluarga ke majlis walimah pada Ahad, 13 Disember 2026, 11.00 pagi hingga 4.00 petang. Lokasi: No F15, Kampung Bukit Aping, Lubuk Buntar, 09800 Serdang, Kedah."
  };
  if (navigator.share) {
    try { await navigator.share({...shareData, url: window.location.href}); }
    catch (error) { if (error.name !== "AbortError") shareNote.textContent = "Pautan tidak dapat dikongsi secara automatik. Salin alamat website dari pelayar."; }
  } else if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(window.location.href);
      shareNote.textContent = "Pautan website telah disalin. Boleh tampal dalam WhatsApp.";
    } catch {
      shareNote.textContent = "Salin alamat website dari bar alamat pelayar untuk berkongsi.";
    }
  } else {
    shareNote.textContent = "Selepas website dihoskan, salin pautan dari bar alamat dan kongsi melalui WhatsApp.";
  }
});
