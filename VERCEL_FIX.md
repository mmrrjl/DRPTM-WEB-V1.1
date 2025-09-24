# Fix 404 Error di Vercel

## Masalah yang Diperbaiki

Error 404 terjadi karena:

1. **Routing Vercel tidak sesuai dengan struktur file**
2. **Serverless function tidak dapat mengakses static files**
3. **Konfigurasi build yang tidak optimal**

## Perubahan yang Dilakukan

### 1. File `api/index.js` (Baru)

- Dibuat entry point yang sesuai dengan Vercel serverless
- Menggunakan CommonJS (require/module.exports) untuk kompatibilitas
- Menambahkan CORS middleware
- Menangani static files dan routing SPA

### 2. File `vercel.json` (Diperbaiki)

- Menggunakan `functions` instead of `builds`
- Routing yang lebih sederhana
- Semua request diarahkan ke `api/index.js`

### 3. File `package.json` (Diperbaiki)

- Menambahkan script `build:server` untuk compile TypeScript
- Update `vercel-build` script

## Struktur File

```
├── api/
│   └── index.js          # Serverless function entry point
├── dist/
│   └── public/           # Static files (HTML, CSS, JS)
├── server/               # Original server code (TypeScript)
├── client/               # React app source
└── vercel.json          # Vercel configuration
```

## Cara Deploy

1. **Commit perubahan:**

   ```bash
   git add .
   git commit -m "Fix 404 error with Vercel serverless configuration"
   git push
   ```

2. **Deploy otomatis** - Vercel akan build dan deploy

## Testing

Setelah deploy, test:

- ✅ Root path (`/`) - harus menampilkan React app
- ✅ API endpoints (`/api/*`) - harus berfungsi
- ✅ Client-side routing - harus bekerja

## Troubleshooting

### Jika masih 404:

1. Periksa logs di Vercel dashboard
2. Pastikan file `api/index.js` ada
3. Periksa apakah build berhasil

### Jika API tidak berfungsi:

1. Periksa environment variables
2. Pastikan database connection
3. Periksa console untuk error

### Jika static files tidak load:

1. Pastikan path di `api/index.js` benar
2. Periksa apakah `dist/public` ada
3. Pastikan build berhasil
