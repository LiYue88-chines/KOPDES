// =====================================
// URL GOOGLE APPS SCRIPT
// =====================================

const URL_GOOGLE_SCRIPT =
    "https://script.google.com/macros/s/AKfycbyRq9tUyPnAGqhkqMZq0P8OKXfjdEVp6RZqBwCpRPYOlXPrRFUjJA71CnE_fq0PS8E/exec";


// =====================================
// DATA PRODUK
// =====================================

let hargaProduk = 0;


// =====================================
// MEMILIH PRODUK
// =====================================

function pilihProduk(nama, harga) {

    document.getElementById("produk").value = nama;

    hargaProduk = harga;

    hitungTotal();

    document.getElementById("produk")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// =====================================
// MENGHITUNG TOTAL
// =====================================

function hitungTotal() {

    const jumlah =
        Number(document.getElementById("jumlah").value);

    const total =
        hargaProduk * jumlah;

    document.getElementById("total").textContent =
        "Rp" + total.toLocaleString("id-ID");
}


// Jika jumlah berubah
document.getElementById("jumlah")
    .addEventListener("input", hitungTotal);


// =====================================
// MENGIRIM PESANAN
// =====================================

document.getElementById("orderForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const nama =
            document.getElementById("nama").value.trim();

        const whatsapp =
            document.getElementById("whatsapp").value.trim();

        const produk =
            document.getElementById("produk").value;

        const jumlah =
            Number(document.getElementById("jumlah").value);

        const alamat =
            document.getElementById("alamat").value.trim();

        const catatan =
            document.getElementById("catatan").value.trim();

        const total =
            hargaProduk * jumlah;


        if (!produk) {

            alert("Silakan pilih produk terlebih dahulu!");

            return;
        }


        const data = {

            nama: nama,

            whatsapp: whatsapp,

            produk: produk,

            jumlah: jumlah,

            total: total,

            alamat: alamat,

            catatan: catatan

        };


        const tombol =
            document.getElementById("kirim");

        const status =
            document.getElementById("status");


        tombol.disabled = true;

        tombol.textContent = "Mengirim...";

        status.textContent = "";


        try {

            await fetch(
                URL_GOOGLE_SCRIPT,
                {
                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body: JSON.stringify(data)
                }
            );


            status.textContent =
                "✅ Pesanan berhasil dikirim!";

            status.style.color = "green";


            document.getElementById("orderForm")
                .reset();


            document.getElementById("total")
                .textContent = "Rp0";

            hargaProduk = 0;


        } catch (error) {

            console.error(error);

            status.textContent =
                "❌ Pesanan gagal dikirim.";

            status.style.color = "red";

        }


        tombol.disabled = false;

        tombol.textContent =
            "🛒 Pesan Sekarang";

    });
