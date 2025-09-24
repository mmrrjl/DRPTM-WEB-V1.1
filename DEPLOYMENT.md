# Deployment Guide - HydroMonitor

## Masalah yang Diperbaiki

Aplikasi Anda mengalami display blank di Vercel karena beberapa masalah konfigurasi:

1. **Konfigurasi Vercel tidak sesuai dengan struktur build Vite**
2. **Path static files tidak sesuai dengan output Vite**
3. **Missing title di HTML**
4. **Query client configuration yang terlalu strict**
5. **Tidak ada error boundary untuk menangani error**

## Perubahan yang Dilakukan

### 1. Konfigurasi Vercel (`vercel.json`)

- Diperbaiki routing untuk static files
- Menggunakan `functions` instead of `builds` untuk serverless functions
- Path routing disesuaikan dengan output Vite

### 2. HTML Template (`client/index.html`)

- Ditambahkan title untuk SEO dan debugging
- Memastikan meta tags lengkap

### 3. Query Client (`client/src/lib/queryClient.ts`)

- Mengubah `staleTime` dari `Infinity` ke `30000` (30 detik)
- Mengubah `retry` dari `false` ke `1` untuk retry otomatis
- Ini mencegah aplikasi stuck saat ada network error

### 4. Error Boundary (`client/src/App.tsx`)

- Ditambahkan `react-error-boundary` untuk menangani error
- Menampilkan error message yang user-friendly
- Tombol reload untuk recovery

### 5. Loading State (`client/src/pages/dashboard.tsx`)

- Ditambahkan loading spinner saat data belum tersedia
- Mencegah blank screen saat loading

### 6. Vite Configuration (`vite.config.ts`)

- Diperbaiki rollup options untuk build yang lebih stabil

## Cara Deploy ke Vercel

1. **Pastikan semua perubahan sudah di-commit:**

   ```bash
   git add .
   git commit -m "Fix Vercel deployment issues"
   git push
   ```

2. **Deploy ke Vercel:**

   - Jika menggunakan Vercel CLI: `vercel --prod`
   - Jika menggunakan GitHub integration: push ke main branch

3. **Environment Variables:**
   Pastikan environment variables berikut sudah di-set di Vercel dashboard:
   - `DATABASE_URL` (jika menggunakan database)
   - `ANTARES_ACCESS_KEY` (jika menggunakan Antares API)
   - `ANTARES_APPLICATION_KEY` (jika menggunakan Antares API)

## Troubleshooting

### Jika masih blank screen:

1. Buka Developer Tools (F12)
2. Periksa Console tab untuk error messages
3. Periksa Network tab untuk failed requests
4. Periksa apakah API endpoints berfungsi di `/api/system-status`

### Jika build gagal:

1. Pastikan Node.js version 18+ di Vercel
2. Periksa apakah semua dependencies terinstall
3. Pastikan tidak ada TypeScript errors

### Jika API tidak berfungsi:

1. Periksa environment variables di Vercel
2. Pastikan database connection string valid
3. Periksa logs di Vercel dashboard

## Testing Local

Untuk test local sebelum deploy:

```bash
npm run build
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5000`
