console.log("Aplikasi Daily Agenda & To-Do List Berjalan!");

const NAMA_AGENDA = "To-Do List M. Desta Permana Nugraha";
console.log("Nama Agenda:", NAMA_AGENDA);
alert("Selamat datang di " + NAMA_AGENDA + "!");

// 1. Seleksi Elemen DOM
const inputTugas = document.getElementById("input-tugas");
const btnTambah = document.getElementById("btn-tambah");
const daftarTugas = document.getElementById("daftar-tugas");

// 2. Elemen Rekap Statistik
const statTotal = document.getElementById("stat-total");
const statSelesai = document.getElementById("stat-selesai");
const statBelum = document.getElementById("stat-belum");

// 3. Elemen Status Gambar
const pesanKosong = document.getElementById("pesan-kosong");
const pesanSelesai = document.getElementById("pesan-selesai");

// 4. Data Penghitung Tugas
let totalTugas = 0;
let tugasSelesai = 0;

// Fungsi memperbarui angka statistik & tampilan status gambar
function perbaruiTampilan() {
  const tugasBelum = totalTugas - tugasSelesai;

  statTotal.textContent = totalTugas;
  statSelesai.textContent = tugasSelesai;
  statBelum.textContent = tugasBelum;

  if (totalTugas === 0) {
    pesanKosong.classList.remove("hidden");
    pesanSelesai.classList.add("hidden");
  } else if (tugasBelum === 0) {
    pesanKosong.classList.add("hidden");
    pesanSelesai.classList.remove("hidden");
  } else {
    pesanKosong.classList.add("hidden");
    pesanSelesai.classList.add("hidden");
  }
}

// Fungsi menambah tugas baru
function tambahTugas() {
  const teks = inputTugas.value.trim();

  // Validasi input kosong
  if (teks === "") {
    alert("Catatan Anda tidak boleh kosong");
    inputTugas.focus();
    return;
  }

  // Buat elemen <li> baru
  const li = document.createElement("li");
  li.className = "task-item";
  li.innerHTML = `
    <label class="task-label">
      <input type="checkbox" class="task-check" />
      <span class="task-teks"></span>
    </label>
    <button class="btn-hapus" title="Hapus tugas">
      <img src="asset/sampah.png" alt="Hapus" />
    </button>
  `;

  // Isi teks tugas
  li.querySelector(".task-teks").textContent = teks;

  const checkbox = li.querySelector(".task-check");
  const btnHapus = li.querySelector(".btn-hapus");

  // Event saat checkbox dicentang / batal
  checkbox.addEventListener("change", function () {
    li.classList.toggle("completed", checkbox.checked);

    if (checkbox.checked) {
      tugasSelesai++;
      console.log(`Tugas "${teks}" ditandai selesai`);
    } else {
      tugasSelesai--;
      console.log(`Tugas "${teks}" batal ditandai selesai`);
    }
    perbaruiTampilan();
  });

  // Event saat tombol hapus diklik
  btnHapus.addEventListener("click", function () {
    if (checkbox.checked) {
      tugasSelesai--;
    }
    li.remove();
    totalTugas--;
    perbaruiTampilan();
    console.log(`Tugas "${teks}" telah dihapus`);
  });

  // Tambahkan ke <ul> dan reset field input
  daftarTugas.appendChild(li);
  inputTugas.value = "";
  inputTugas.focus();

  totalTugas++;
  perbaruiTampilan();
  console.log(`Tugas baru ditambahkan: "${teks}"`);
}

// Event Listeners
btnTambah.addEventListener("click", tambahTugas);

inputTugas.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    tambahTugas();
  }
});