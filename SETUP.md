# Setup – Purchasing Eka Group Frontend

## Dependencies yang Perlu Diinstall

Jalankan perintah berikut di root project sebelum menjalankan dev server:

```bash
npm install lucide-react clsx tailwind-merge
```

| Package | Versi | Kegunaan |
|---|---|---|
| `lucide-react` | latest | Icon set untuk seluruh UI |
| `clsx` | latest | Conditional class helper |
| `tailwind-merge` | latest | Deduplication Tailwind class conflicts |

---

## Menjalankan Project

```bash
npm run dev
```

Buka http://localhost:3000

---

## Struktur Folder

```
app/
  globals.css           — Global styles + animasi
  layout.tsx            — Root layout (viewport meta, font)
  page.tsx              — Entry point → DashboardView

lib/
  utils.ts              — cn(), formatDate(), isMenuLocked(), generateId()

types/
  index.ts              — Semua TypeScript interface & type

mock/
  ingredients.ts        — 55 master bahan baku Indonesia
  packages.ts           — Paket mingguan Jan–Mei 2026 + groupPackagesByMonth()
  menus.ts              — Menu harian per paket (data realistis)

hooks/
  useDashboard.ts       — State utama: paket aktif, menu list, form, toast
  useMenuForm.ts        — State form tambah/edit menu + ingredient selector

components/
  features/
    DashboardView.tsx       — Client Component utama, menyatukan semua bagian
    WeeklyPackageSidebar.tsx — Sidebar kiri: list paket per bulan
    DailyMenuList.tsx       — List MenuCard + skeleton loading + empty state
    MenuCard.tsx            — Card accordion per menu harian
    MenuFormSheet.tsx       — Bottom sheet: form tambah/edit menu
    IngredientSelector.tsx  — Searchable dropdown bahan baku + tambah baru
    IngredientItem.tsx      — Row input quantity/note per bahan baku
    ProgressStatus.tsx      — Badge status + progress bar
    EmptyState.tsx          — Empty state component
    ToastContainer.tsx      — Toast notification fixed overlay
```

---

## Fitur yang Sudah Diimplementasi

### Dashboard
- [x] Sidebar paket mingguan dengan grouping per bulan
- [x] Sidebar mobile drawer (slide-in dari kiri) dengan overlay
- [x] Sidebar desktop selalu visible
- [x] Header sticky dengan judul paket aktif
- [x] Search bar collapsible
- [x] Filter status (Semua / Menunggu / Sebagian / Lengkap)
- [x] Progress bar paket aktif di info strip
- [x] Floating Action Button (FAB) untuk tambah menu
- [x] Loading skeleton saat switch paket

### Menu Harian
- [x] Menu card accordion (expand untuk lihat bahan baku)
- [x] Badge status: Menunggu Penjadwalan / Barang Sampai X% / Bahan Baku Lengkap
- [x] Progress bar pengiriman per menu
- [x] Aksi per menu: Edit / Hapus (via ⋮ menu)
- [x] Lock rule: menu terkunci jika sudah melewati H-1 jam 23:59
- [x] Badge "Terkunci" + tooltip pada menu yang locked
- [x] Edit button disabled jika locked

### Form Tambah/Edit Menu
- [x] Bottom sheet mobile-style (slide up dari bawah)
- [x] Field: nama menu, tanggal kirim, jumlah porsi
- [x] Section bahan baku dengan searchable dropdown
- [x] Rekomendasi bahan baku saat mengetik
- [x] Tambah bahan baku baru (nama + satuan)
- [x] Input quantity + keterangan per bahan baku
- [x] Tombol hapus per bahan baku
- [x] Validasi: submit disabled jika belum ada bahan baku atau quantity kosong
- [x] Warning ringan jika bahan baku kosong
- [x] Sticky save button di bawah form
- [x] Toast success setelah simpan

### UX Mobile
- [x] Touch target minimal 44px pada semua tombol aksi
- [x] Overscroll contain pada area scroll
- [x] Dynamic viewport height (h-dvh)
- [x] No body scroll saat bottom sheet terbuka
- [x] Compact spacing, typography rapat tapi nyaman

---

## Integrasi API (Kedepannya)

Semua mock data berada di `mock/`. Untuk integrasi API:

1. **`hooks/useDashboard.ts`** — Ganti `useState(MOCK_MENUS)` dengan fetch dari API endpoint
2. **`mock/packages.ts`** — Ganti `MOCK_PACKAGES` dengan `GET /api/packages`
3. **`mock/ingredients.ts`** — Ganti `MOCK_INGREDIENTS` dengan `GET /api/ingredients`
4. **Form save** — Ganti `setMenus(...)` dengan `POST /api/menus` / `PUT /api/menus/:id`
5. **Delete** — Ganti `filter(...)` dengan `DELETE /api/menus/:id`

TypeScript interface di `types/index.ts` sudah siap digunakan sebagai response type dari API.

---

## Catatan Desain

- **Warna primary**: `blue-600` (#2563eb)
- **Background**: `slate-50` (#f8fafc)
- **Surface**: `white` (#ffffff)
- **Border**: `slate-200` (#e2e8f0)
- **Status pending**: badge slate
- **Status partial**: badge amber
- **Status complete**: badge emerald
- Tidak menggunakan dark mode, gradient, atau glassmorphism
- Typography compact: base 14px, label 10-11px, semibold untuk heading
