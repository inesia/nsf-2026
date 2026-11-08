# MSF 2026 — Multi-page

HTML + Tailwind CSS untuk Media Sustainability Forum 2026.

## Halaman
| File | Isi |
|------|-----|
| `index.html` | Beranda — hero slider, teaser tentang, preview pembicara, sponsor |
| `tentang.html` | Mengapa digelar, galeri MSF 2025, hasil 2025, KKM, arah 2026, CTA |
| `pembicara.html` | Pembicara per hari & sesi |
| `rundown.html` | Agenda dua hari |
| `daftar.html` | Form pendaftaran + preview konfirmasi |
| Menu KTP2JB | Link eksternal ke https://ktp2jb.or.id/ |

## Cara membuka
Buka `index.html` di browser, atau jalankan `npx serve` dari folder project.

## Design tokens
```css
--ink: #181832;
--navy: #29234f;
--teal: #008e96;
--teal-dark: #007c85;
--purple: #282450;
--muted: #69718a;
--page-width: 1510px;
--ease: cubic-bezier(.2,.75,.15,1);
```

## Mengedit
- Halaman HTML di root
- `input.css` — komponen
- `assets/site.js` — menu mobile + hero slider
- `npm install` lalu `npm run build` setelah mengubah CSS
