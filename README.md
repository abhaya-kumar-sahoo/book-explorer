# Book Explorer

A fast, responsive web application for exploring and reading over 70,000 public domain books from [Project Gutenberg](https://www.gutenberg.org/) via the [Gutendex API](https://gutendex.com/).

Built with React 19, Tailwind CSS v4, Bun, and Redux Toolkit Query.

---

## Features

- **Responsive Book Grid**: Dynamic layout adapting from mobile screens (2-column) up to wide desktop monitors (6-column) with natural aspect-ratio book covers and fallback artwork.
- **Server-Side Search & Filtering**:
  - Full-text search by book title or author name (debounced at 500ms).
  - Multi-language filtering (English, French, Finnish, German).
  - Subject/bookshelf topics (Fiction, Children, Science Fiction, Poetry).
  - Sorting options (Popular, ID ascending, ID descending).
- **Two-Way URL State Sync**: Search terms, active filters, sort orders, and page indices are bound directly to URL query strings for instant bookmarking and shareability.
- **Performance & Caching**:
  - RTK Query in-memory caching paired with persistent local storage.
  - Background pre-fetching for adjacent pagination pages and book detail views on hover/tap.
  - Smooth, non-blocking loading states that avoid layout shifts while results update.
- **Dedicated Book Detail View**:
  - Comprehensive metadata including author lifespan, subjects, and bookshelves.
  - Direct reading and download links for HTML, EPUB, Kindle, and Plain Text formats.
- **Mobile Bottom Sheet Filter Drawer**: Clean touch-friendly interface designed specifically for handheld displays.

---

## Tech Stack

- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State & Data Fetching**: [Redux Toolkit (RTK Query)](https://redux-toolkit.js.org/rtk-query/overview)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Linting**: [Oxlint](https://oxc.rs/)

---

## Getting Started

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd book-explorer
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun dev
   ```

4. Build for production:
   ```bash
   bun run build
   ```

5. Run linter:
   ```bash
   bun run lint
   ```

---

## Architecture & Code Structure

```
src/
├── assets/           # Icons, brand logos, illustrations
├── components/       # UI components (BookCard, SearchBar, FilterPanel, Pagination, etc.)
├── constants/        # Filter options, language codes, design tokens
├── hooks/            # Custom hooks (e.g. useDebounce)
├── pages/            # Main views: BookExplorer, BookDetail
├── store/            # Redux store, RTK Query API slices, persistent cache storage
└── main.jsx          # Application entry point
```

---

## License

MIT
