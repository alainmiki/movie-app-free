# Movie App Specification

## Project Overview

- **Project Name**: Cineverse
- **Type**: Web application (Next.js)
- **Core Functionality**: A movie discovery app that allows users to browse popular movies, search for titles, and view detailed information about each movie
- **Target Users**: Movie enthusiasts looking to discover new films

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- TMDB API (free movie database)

## UI/UX Specification

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background Primary | Deep Black | `#0a0a0a` |
| Background Secondary | Charcoal | `#141414` |
| Background Card | Dark Gray | `#1f1f1f` |
| Accent Primary | Electric Coral | `#ff6b6b` |
| Accent Secondary | Warm Gold | `#ffd93d` |
| Text Primary | Off White | `#f5f5f5` |
| Text Secondary | Cool Gray | `#9ca3af` |
| Border | Subtle Gray | `#2a2a2a` |

### Typography

- **Heading Font**: "Bebas Neue" (Google Fonts) - Bold, cinematic feel
- **Body Font**: "DM Sans" (Google Fonts) - Clean, readable
- **Sizes**:
  - Hero Title: 4rem (64px)
  - Section Title: 2rem (32px)
  - Card Title: 1.1rem (18px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)

### Layout Structure

#### Pages

1. **Home Page** (`/`)
   - Hero section with featured movie
   - Trending movies carousel
   - Popular movies grid
   - Top rated movies grid

2. **Search Page** (`/search`)
   - Search input with real-time results
   - Movie results grid

3. **Movie Details Page** (`/movie/[id]`)
   - Full movie backdrop
   - Movie poster and info
   - Cast & crew section
   - Similar movies

#### Responsive Breakpoints

- Mobile: < 640px (2 columns grid)
- Tablet: 640px - 1024px (3 columns grid)
- Desktop: > 1024px (5 columns grid)

### Components

1. **Navbar**
   - Logo (left)
   - Navigation links: Home, Search (center/right)
   - Fixed position, backdrop blur

2. **MovieCard**
   - Poster image with aspect ratio 2:3
   - Title overlay on hover
   - Rating badge (top right)
   - Year badge (bottom left)
   - Smooth scale animation on hover

3. **HeroSection**
   - Full-width backdrop image
   - Gradient overlay (bottom to top)
   - Movie title, overview, rating
   - "View Details" button

4. **SearchBar**
   - Large input with icon
   - Debounced search (300ms)
   - Clear button

5. **MovieGrid**
   - Responsive grid layout
   - Lazy loading for images
   - Skeleton loading state

### Animations

- Page transitions: fade in (300ms)
- Cards: scale(1.02) on hover (200ms ease-out)
- Hero: subtle parallax effect
- Loading: skeleton pulse animation

## Functionality Specification

### Core Features

1. **Browse Movies**
   - Fetch and display trending/popular/top-rated movies
   - Infinite scroll or pagination
   - Filter by category

2. **Search Movies**
   - Real-time search with debounce
   - Display results in grid
   - Handle empty states

3. **Movie Details**
   - Fetch full movie information
   - Display cast and crew
   - Show similar movies
   - Link to external streaming (optional)

4. **API Integration**
   - Use TMDB API (free tier)
   - Cache responses for performance
   - Handle rate limiting

### Data Handling

- Server-side data fetching with Next.js
- Image optimization with next/image
- Error boundaries for failed requests

### Edge Cases

- No results found: show friendly message
- API error: show error state with retry
- Image load failure: show placeholder
- Slow connection: show skeleton loaders

## API Configuration

- TMDB API Base URL: `https://api.themoviedb.org/3`
- Image Base URL: `https://image.tmdb.org/t/p/`
- API Key: Store in environment variable `NEXT_PUBLIC_TMDB_API_KEY`

## File Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with font
│   ├── page.tsx            # Home page
│   ├── search/
│   │   └── page.tsx        # Search page
│   ├── movie/
│   │   └── [id]/
│   │       └── page.tsx   # Movie details page
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── MovieCard.tsx
│   ├── MovieGrid.tsx
│   ├── HeroSection.tsx
│   ├── SearchBar.tsx
│   ├── CastList.tsx
│   └── Skeleton.tsx
├── lib/
│   ├── tmdb.ts             # API functions
│   └── types.ts            # TypeScript types
```

## Acceptance Criteria

1. ✅ Home page displays trending, popular, and top-rated movies
2. ✅ Clicking a movie card navigates to details page
3. ✅ Search returns relevant results
4. ✅ Movie details show poster, overview, cast, and similar movies
5. ✅ Responsive design works on mobile, tablet, desktop
6. ✅ Loading states display during data fetch
7. ✅ Error states handle failed API calls
8. ✅ All pages pass typecheck and lint
