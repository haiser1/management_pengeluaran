# Management Pengeluaran
saya menggunakan NodeJs v20.5.0, npm v9.8.0
Sebuah API sederhana untuk mencatat pengeluaran dan barang apa saja yang anda beli dan bisa melihat jumlah pengeluaran anda 

# Cara Install
clone projek ini dengan cara https://github.com/haiser1/management_pengeluaran.git
import file Pengeluaran.postman_collection.json ke postman anda
npm i
buat file .env sesuaikan saja dengan file .env_example
import models 
uncomment code ini : ModelsName.sync() => ModlesName ganti jadi nama models nya, untuk table sessions tiggal ubah aja 
menjadi store.sync()
jalankan server : npm start
untuk bisa akses anda harus register dulu
