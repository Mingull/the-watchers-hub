# Watchers Hub

**Watchers Hub** is a personal entertainment hub for keeping track of the movies, series, episodes, and eventually music that I consume.

The goal is to have one place where I can keep track of what I've watched, discover what to watch next, and explore the timelines and connections between different franchises.

## Features

### Movies & Series

- Keep track of which movies I have watched.
- Keep track of which episodes I have watched.
- Track progress through TV series and individual seasons.
- Add movies and series to a personal watchlist.
- Rate and favorite movies and series.
- View where a movie or series is currently available to stream.
- Use TMDB as the external source for movie and series metadata.

### Franchise Timelines

A major feature of Watchers Hub is having useful timelines for large movie and TV franchises.

Rather than simply displaying movies in release order or putting them side-by-side chronologically, timelines should represent the **actual in-universe chronology**.

For example:

```text
1990
│
├── Movie 1
│
1992
│
├── Movie 2
├── Movie 3
│
1999
│
└── Movie 4
```

Movies and series should therefore be grouped by the year or period in which their story takes place, making it easier to understand how the events of a franchise fit together.

### Marvel

For Marvel, Watchers Hub should provide:

- An in-universe chronological timeline.
- Movies and series grouped by the year/period they take place in.
- Marvel phases displayed separately.
- The ability to view the franchise in both **timeline order** and **phase/release order**.

For example:

```text
MCU

Phase One
├── Iron Man
├── The Incredible Hulk
├── Iron Man 2
├── Thor
└── Captain America: The First Avenger

Timeline
├── 1940s
│   └── Captain America: The First Avenger
├── 2010
│   └── Iron Man
├── 2011
│   ├── Iron Man 2
│   ├── Thor
│   └── ...
└── ...
```

### DC

DC should have separate timelines for its different cinematic universes.

Initially this includes:

- **DCEU**
- **James Gunn's DC Universe (DCU)**

The same timeline concept should be used for both: events should be positioned according to when they take place within the universe rather than simply by release date.

### Other Franchises

The timeline system should not be designed specifically for Marvel or DC.

It should eventually support **any franchise with a meaningful chronology**, for example:

- Star Wars
- Harry Potter / Wizarding World
- The Lord of the Rings
- Planet of the Apes
- X-Men
- Jurassic Park / Jurassic World
- Transformers
- Mission: Impossible
- Fast & Furious
- etc.

Each franchise can have its own chronology, eras, phases, universes, or other organizational structure where appropriate.

## Personal Entertainment

Watchers Hub should eventually expand beyond movies and series.

### Music

A future version may integrate with Spotify to provide a similar personal tracking experience for music.

Potential features include:

- Recently played tracks.
- Listening history.
- Favorite artists.
- Favorite albums.
- Listening statistics.
- Top artists and tracks.
- Yearly listening summaries.

The goal is for Watchers Hub to eventually become a **personal entertainment hub**, rather than only a movie tracker.

## Data Sources

### TMDB

TMDB will be used as the primary source for movie and TV metadata, including information such as:

- Titles
- Release dates
- Descriptions
- Posters and backdrops
- Cast and crew
- Genres
- Seasons and episodes
- Streaming providers
- Other movie/TV metadata

Watchers Hub will store only the data that is relevant to the application's own functionality. TMDB remains the source of truth for the majority of media metadata.

Frequently requested TMDB data can later be cached using Redis if necessary.

### Future Data Sources

Other services may be integrated in the future, such as:

- Spotify
- Other streaming services
- Additional media databases

## Tech Stack

### Application

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**

### Backend & Data

- **Better Auth**
- **Drizzle ORM**
- **PostgreSQL**

### External APIs

- **TMDB API**
- **Spotify API** _(planned)_

### Tooling

- **Turborepo**
- **pnpm**
- **Docker Compose**

Docker is currently only intended to run the PostgreSQL database during development.

## Project Goals

The main goal of Watchers Hub is not to build another generic movie database.

It should become a **personal entertainment dashboard** that makes it easy to:

- Keep track of what I have watched.
- Keep track of what I want to watch.
- Track progress through series.
- Explore franchises.
- Understand franchise timelines.
- See how different movies and series connect.
- View personal entertainment statistics.
- Eventually track music and other forms of entertainment.

The project should also be a place to experiment with new technologies and ideas while building something that I actually want to use.
