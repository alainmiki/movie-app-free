# Active Context: Cineverse Movie App

## Current State

**Project Status**: ✅ Complete - Full-featured movie platform with TV shows, search, streaming, and social features

The Cineverse movie app is a comprehensive platform with TMDB API integration, featuring movies, TV shows, watchlist, ratings, and multiple streaming options.

## Recently Completed

- [x] **Dark/Light Theme Toggle** - Persistent theme with system preference detection
- [x] **Watchlist** - Add/remove movies with localStorage persistence
- [x] **Recently Watched** - Track viewing history with progress
- [x] **Film Grain Overlay** - Cinematic visual effect
- [x] **TV Shows Support** - Browse and view TV show details with seasons
- [x] **Infinite Scroll** - Load more results on search page
- [x] **Voice Search** - Use microphone for search input
- [x] **Autocomplete Suggestions** - Search suggestions while typing
- [x] **Movie Ratings** - Rate movies 1-10 stars, persisted locally
- [x] **Share Functionality** - Share movies via Twitter, Facebook, Email, Copy Link
- [x] **Enhanced Player Close** - Escape key, click outside, body scroll lock
- [x] **Home Page Improvements** - Now Playing, Continue Watching, quick action cards
- [x] **Streaming Page Fix** - Added Crackle and Popcornflix tabs, replaced fake iframes with external redirect links

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page with hero + movie grids | ✅ Complete |
| `src/app/search/page.tsx` | Search with infinite scroll, voice | ✅ Complete |
| `src/app/movie/[id]/page.tsx` | Movie details with ratings, share | ✅ Complete |
| `src/app/tv/page.tsx` | TV shows browse page | ✅ Complete |
| `src/app/tv/[id]/page.tsx` | TV show details with seasons | ✅ Complete |
| `src/app/watchlist/page.tsx` | User watchlist | ✅ Complete |
| `src/app/free/page.tsx` | Free movies (Archive + YouTube) | ✅ Complete |
| `src/app/streaming/page.tsx` | Streaming movies | ✅ Complete |
| `src/components/` | UI components | ✅ Complete |
| `src/hooks/` | Custom React hooks | ✅ Complete |
| `src/lib/types.ts` | TypeScript interfaces | ✅ Complete |
| `src/lib/tmdb.ts` | API functions with TV shows | ✅ Complete |

## Features

1. **Home Page**
   - Hero section with featured movie
   - Continue Watching section
   - Now Playing section
   - Popular movies grid
   - Top rated movies grid
   - Quick links to Stream and Free pages

2. **TV Shows**
   - Browse trending and popular TV shows
   - Detailed TV show pages with seasons
   - Cast and similar shows

3. **Search**
   - Infinite scroll pagination
   - Voice search (microphone)
   - Autocomplete suggestions
   - Filter by Movies/TV Shows

4. **Movie Details**
   - Backdrop with gradient
   - Rating system (1-10 stars)
   - Share to social media
   - Add to watchlist
   - Trailer playback
   - Where to watch providers

5. **Watchlist**
   - Save movies to watchlist
   - Remove from watchlist
   - Clear all

6. **Free Movies Page**
   - Internet Archive tab
   - YouTube tab
   - Grid/List view toggle
   - Genre filters

## Custom Hooks

- `useTheme` - Theme management
- `useWatchlist` - Watchlist CRUD operations
- `useRecentlyWatched` - Viewing history
- `useMovieRatings` - Movie rating system
- `useInfiniteScroll` - Infinite scroll logic

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React icons
- TMDB API (with fallback)
- react-intersection-observer

## Quick Start

```bash
# Development
bun run dev

# Production build
bun run build

# With TMDB API
NEXT_PUBLIC_TMDB_API_KEY=xxx bun run dev
```