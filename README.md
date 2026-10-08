# Jooexe Portfolio

Portfolio website personal untuk Jooexe, frontend developer dari Sumatra Selatan. Website ini menggabungkan visual dark editorial, animasi interaktif, live data, dan pengalaman responsive untuk desktop maupun mobile.

## Highlights

- Particle preloader yang berkumpul menjadi inti cahaya sebelum splash screen.
- Sound effect futuristik singkat menggunakan Web Audio API.
- Scroll reveal dua arah dan parallax ringan pada hero.
- Live GitHub profile dan repository statistics.
- Live market snapshot dari CoinGecko.
- Live weather dari Open-Meteo untuk Sumatra Selatan.
- Project search dan filter berdasarkan bahasa pemrograman.
- Detail studi kasus untuk setiap project.
- Responsive layout dengan adaptive animation quality untuk perangkat mobile.
- Fallback low-power untuk perangkat dengan hardware atau koneksi terbatas.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Wouter
- Web Audio API
- GitHub REST API
- CoinGecko API
- Open-Meteo API

## Requirements

- Node.js 22 atau lebih baru
- pnpm 10 atau lebih baru

## Installation

```bash
git clone https://github.com/JohnIsDimz/portofolio-joo.git
cd portofolio-joo
pnpm install
```

## Development

Jalankan development server:

```bash
pnpm dev
```

Setelah server berjalan, buka URL yang ditampilkan oleh Vite.

## Production Build

Validasi TypeScript:

```bash
pnpm check
```

Build production:

```bash
pnpm build
```

Preview hasil build:

```bash
pnpm preview
```

Menjalankan server production setelah build:

```bash
pnpm start
```

## Scripts

| Script | Kegunaan |
| --- | --- |
| `pnpm dev` | Menjalankan development server |
| `pnpm check` | Memeriksa TypeScript tanpa menghasilkan file output |
| `pnpm build` | Membuat production build |
| `pnpm preview` | Preview hasil Vite build |
| `pnpm start` | Menjalankan server production |
| `pnpm format` | Memformat source code dengan Prettier |

## Struktur Project

```text
client/
  index.html
  public/
  src/
    components/
    contexts/
    hooks/
    lib/
    pages/
    App.tsx
    index.css
    main.tsx
server/
  index.ts
shared/
  const.ts
```

## Live Data

Website mengambil data publik secara client-side:

- GitHub digunakan untuk profil dan repository.
- CoinGecko digunakan untuk harga Bitcoin, Ethereum, dan Solana.
- Open-Meteo digunakan untuk suhu serta kondisi cuaca.

Jika API tidak tersedia, UI menggunakan fallback state yang aman dan menampilkan status data tidak tersedia tanpa menyamarkan angka sebagai data live.

## Animation Performance

Website secara otomatis memilih mode animasi berdasarkan:

- Ukuran viewport perangkat.
- `prefers-reduced-motion`.
- Jumlah hardware concurrency.
- Preferensi `Save-Data` browser.

Pada perangkat mobile atau low-power, jumlah partikel, blur, shadow, dan layer visual dikurangi agar animasi tetap lancar dan hemat baterai.

## License

MIT

## Contact

Portfolio ini dibuat untuk menampilkan karya, eksperimen frontend, dan cara menghubungi Jooexe. Silakan gunakan repository ini sebagai referensi struktur portfolio React modern.
