// Number Format
function formatRupiah(value) {
  // Remove non-numeric characters except decimal
  const number = value.replace(/[^0-9]/g, "");
  // Format number with thousand separator
  const formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return formattedNumber ? "Rp " + formattedNumber : "";
}

function parseRupiah(value) {
  // Remove 'Rp ' and format separator, then convert to number
  return parseFloat(value.replace(/[^\d]/g, ""));
}

document
  .getElementById("amount_CF")
  .addEventListener("input", function (event) {
    const input = event.target;
    const formattedValue = formatRupiah(input.value);
    // Update the input value with formatted value
    input.value = formattedValue;
  });

// Data kategori dan sub-kategori
const data = {
  categories: {
    makanan: "Makanan dan Minuman",
    transportasi: "Transportasi",
    perumahan: "Perumahan",
    kesehatan: "Kesehatan dan Kebugaran",
    pendidikan: "Pendidikan dan Pelatihan",
    hiburan: "Hiburan dan Rekreasi",
    belanja: "Belanja",
    kewajiban: "Kewajiban dan Utang",
    donasi: "Donasi dan Amal",
    lainlain: "Lain-lain",
  },
  subCategories: {
    makanan: [
      "Makan di luar",
      "Belanja bahan makanan",
      "Minuman (kopi, alkohol, dll.)",
    ],
    transportasi: [
      "Bensin",
      "Ongkos transportasi umum (bus, kereta, taksi)",
      "Perawatan kendaraan (servis, suku cadang)",
      "Parkir",
    ],
    perumahan: [
      "Sewa rumah/apartemen",
      "Hipotek (cicilan rumah)",
      "Tagihan utilitas (listrik, air, gas)",
      "Perawatan rumah (perbaikan, pembersihan)",
    ],
    kesehatan: [
      "Asuransi kesehatan",
      "Pengobatan dan obat-obatan",
      "Gym atau keanggotaan kebugaran",
      "Kunjungan dokter",
    ],
    pendidikan: [
      "Biaya sekolah atau kuliah",
      "Buku dan materi belajar",
      "Kursus dan pelatihan",
    ],
    hiburan: [
      "Langganan streaming (Netflix, Spotify, dll.)",
      "Kegiatan rekreasi (berlibur, menonton film, dll.)",
      "Kegiatan sosial (makan malam, acara, dll.)",
    ],
    belanja: [
      "Pakaian dan aksesori",
      "Barang-barang rumah tangga",
      "Elektronik dan gadget",
    ],
    kewajiban: ["Cicilan utang", "Pembayaran kartu kredit"],
    donasi: ["Sumbangan", "Kegiatan amal"],
    lainlain: [
      "Biaya tidak terduga",
      "Biaya personal (misalnya: hadiah, langganan majalah)",
    ],
  },
};

// Ambil elemen dropdown
const categorySelect = document.getElementById("category_CF");
const subCategorySelect = document.getElementById("sub_category_CF");

// Fungsi untuk mengisi dropdown kategori
function populateCategories() {
  Object.keys(data.categories).forEach((key) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = data.categories[key];
    categorySelect.appendChild(option);
  });
}

// Fungsi untuk mengupdate sub-kategori
function updateSubCategories() {
  const selectedCategory = categorySelect.value;
  const subCategories = data.subCategories[selectedCategory] || [];

  // Kosongkan sub-kategori
  subCategorySelect.innerHTML =
    '<option value="" selected disabled>Select a sub-category</option>';

  // Isi sub-kategori baru
  subCategories.forEach((subCategory) => {
    const option = document.createElement("option");
    option.value = subCategory;
    option.textContent = subCategory;
    subCategorySelect.appendChild(option);
  });
}

// Inisialisasi kategori
populateCategories();

// Tambahkan event listener untuk kategori
categorySelect.addEventListener("change", updateSubCategories);

// Event listener for category selection
document.getElementById("category_CF").addEventListener("change", function () {
  const selectedCategoryName = this.value;
  if (selectedCategoryName) {
    populateSubCategories(selectedCategoryName);
  }
});

// Function to handle form submission
function submitFormOut() {
  // Get form data
  const date_CF = document.getElementById("date_CF").value;
  const category_CF = document.getElementById("category_CF").value; // This will be Kategori
  const sub_category_CF = document.getElementById("sub_category_CF").value;
  const description_CF = document.getElementById("description_CF").value;
  const rawAmount_CF = document.getElementById("amount_CF").value;
  const amount_CF = parseRupiah(rawAmount_CF);
  const payment_method_CF = document.getElementById("payment_method_CF").value;

  // Generate ID_CF
  const id_CF = `="CFOUT"&${date_CF.replace(/-/g, "")}&row()`;

  // Get current date and time for created_at
  const created_at = new Date().toISOString(); // ISO format for created_at

  // Prepare data for API
  const data = {
    data: [
      {
        ID_CFOUT: id_CF,
        Date_CFOUT: date_CF,
        Category_CFOUT: category_CF, // Use Kategori here
        Sub_Category_CFOUT: sub_category_CF,
        Description_CFOUT: description_CF,
        Amount_CFOUT: amount_CF,
        Payment_Method_CFOUT: payment_method_CF,
        Created_At: created_at, // Add created_at here
      },
    ],
  };

  // Send data using fetch
  fetch("https://sheetdb.io/api/v1/fftdc1zso7lnt", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      alert("Form submitted successfully!");

      // Clear form fields
      document.getElementById("myForm").reset();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error submitting form. Please try again.");
    });
}

// Fetch all data and populate dropdowns when the page loads
window.onload = fetchData;
