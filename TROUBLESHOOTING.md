# Troubleshooting Guide - 404 Error

## 🔍 Debugging 404 Error

### 1. Periksa Logs di Vercel Dashboard

- Buka Vercel dashboard
- Pilih project Anda
- Klik "Functions" tab
- Lihat logs untuk `api/index.js`
- Cari error messages

### 2. Test API Endpoints

Coba akses endpoint berikut:

- `https://your-app.vercel.app/api/test` - Harus return JSON
- `https://your-app.vercel.app/api/system-status` - Harus return status

### 3. Periksa Build Output

Pastikan file berikut ada:

- `dist/public/index.html`
- `dist/public/assets/index-*.css`
- `dist/public/assets/index-*.js`

### 4. Debug Path Issues

File `api/index.js` sekarang memiliki logging:

```javascript
console.log("API server starting...");
console.log("__dirname:", __dirname);
console.log("Static files path:", path.join(__dirname, "../dist/public"));
```

## 🛠️ Perbaikan yang Sudah Dilakukan

### 1. Routing Configuration

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/api/index.js"
    }
  ]
}
```

### 2. Error Handling

- File existence check
- Detailed error messages
- Fallback HTML response

### 3. Debug Logging

- Path logging
- Request logging
- Error logging

## 🚀 Langkah Deploy

1. **Commit perubahan:**

   ```bash
   git add .
   git commit -m "Fix 404 error with improved routing and error handling"
   git push
   ```

2. **Monitor deployment:**
   - Periksa build logs
   - Test endpoints setelah deploy
   - Periksa function logs

## 🔧 Jika Masih 404

### Option 1: Check Vercel Logs

1. Buka Vercel dashboard
2. Pilih project
3. Klik "Functions" tab
4. Lihat logs untuk error details

### Option 2: Test Local

```bash
npm run build
node api/index.js
```

Kemudian buka `http://localhost:3000`

### Option 3: Simplify Further

Jika masih error, coba hapus `vercel.json` dan biarkan Vercel auto-detect.

## 📝 Expected Behavior

Setelah deploy sukses:

- ✅ Root path (`/`) - Menampilkan React app
- ✅ API test (`/api/test`) - JSON response
- ✅ Static files - CSS/JS load dengan benar
- ✅ Client routing - React Router bekerja

## 🆘 Emergency Fallback

Jika semua gagal, buat file `index.html` di root:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>HydroMonitor</title>
  </head>
  <body>
    <h1>HydroMonitor - DRPTM Hydroponic System</h1>
    <p>Application is loading...</p>
    <script>
      // Redirect to API
      window.location.href = "/api/test";
    </script>
  </body>
</html>
```
