# Management Pengeluaran

Saya menggunakan NodeJs v20.5.0, dan npm v9.8.0
Sebuah API sederhana untuk mencatat pengeluaran anda dan jumlah pengeluaran anda.

## Cara Install

1. Clone projek ini dengan cara: `https://github.com/haiser1/management_pengeluaran.git`
2. Import file `Pengeluaran.postman_collection.json` ke Postman anda.
3. Jalankan perintah: `npm i`.
4. Buat file `.env` sesuaikan saja dengan file `.env_example`.
5. Import models dan uncomment code ini: `ModelsName.sync()` => Ganti `ModelsName` dengan nama model yang sesuai. Untuk table `sessions`, cukup ubah menjadi `store.sync()`.
6. Jalankan server: `npm start`.
7. Untuk bisa mengakses, Anda harus melakukan registrasi terlebih dahulu.



