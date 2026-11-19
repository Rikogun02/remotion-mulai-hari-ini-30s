# Remotion — Mulai Hari Ini (30 detik)

Video motion-graphic motivasi berbahasa Indonesia, durasi 30 detik, 1920×1080, 30 fps, MP4 H.264 + AAC. Proyek memakai React, TypeScript, dan Remotion. Visual dibuat sendiri dari SVG, bentuk geometris, gradien, dan tipografi; tidak ada footage, musik, atau aset berhak cipta.

## Struktur
- `src/` — komposisi Remotion dan komponen scene/subtitle.
- `public/scenes/` — lima visual SVG orisinal.
- `public/audio/` — voice-over pria dan ambience; dibuat otomatis secara offline.
- `public/subtitles.srt` / `public/subtitles.ass` — subtitle.
- `src/assets/subtitles.ts` — cue subtitle Remotion.
- `docs/script.md` — naskah dan breakdown scene.
- `scripts/generate-audio.py` — generator VO dan ambience offline.
- `.github/workflows/render.yml` — build, render, dan upload MP4 sebagai artifact.

## Menjalankan
Membutuhkan Node.js 20+, Python 3, eSpeak, dan FFmpeg. Koneksi internet dibutuhkan saat pertama kali memasang dependensi npm.

```bash
npm install
npm run typecheck
npm run render
```

`npm run render` otomatis membuat audio offline terlebih dahulu, lalu menjalankan Remotion.

Perintah langsung:
```bash
python3 scripts/generate-audio.py
npx remotion render src/index.ts MainVideo out/video.mp4 --codec=h264
```

## Voice-over offline
VO laki-laki Bahasa Indonesia dibuat dengan eSpeak lokal, tanpa cloud, akun, API key, atau biaya. Piper tidak tersedia di lingkungan produksi saat ini dan modelnya tidak dapat diunduh karena akses jaringan terbatas. Karena itu VO menggunakan eSpeak. Suaranya jelas dan bisa dipakai, tetapi lebih sintetis daripada neural TTS.

## GitHub Actions
Buka tab **Actions → Render Remotion video → Run workflow**. Workflow memasang eSpeak dan FFmpeg, membuat audio, memasang dependensi, menjalankan TypeScript check, merender MP4, lalu menyimpan `out/video.mp4` sebagai artifact `mulai-hari-ini-video`.

## Verifikasi
MP4 final yang disertakan di hasil chat diverifikasi: 30.000 detik, 1920×1080, 30 fps, H.264, audio AAC stereo 48 kHz. Subtitle dibakar ke video dan file SRT/ASS juga disertakan.

Render final berhasil dibuat secara native dengan Remotion melalui GitHub Actions. TypeScript check dan langkah render Remotion pada workflow berhasil; MP4 final tersedia pada artifact workflow dan di hasil unduhan proyek.
