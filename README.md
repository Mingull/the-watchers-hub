# Watchers Hub

**Watchers Hub** is a platform for exploring entertainment franchises through curated chronological timelines and keeping track of your viewing progress.

Choose a franchise, explore its timeline, and follow the events in the order they take place within its universe. Track which movies, series, episodes, specials and other media you've watched, where you left off, and how many times you've completed an entire franchise.

Watch alone or create shared timelines with friends and family to follow a franchise together.

## Core Features

### Franchise Exploration

Watchers Hub is organized around entertainment franchises rather than individual movies or series.

Users can explore different franchises, each with its own curated timeline and associated media.

Initial franchises include:

- **Marvel Cinematic Universe (MCU)**
- **Arrowverse**
- **DC Extended Universe (DCEU)**
- **DC Universe (DCU)**

The platform should not be limited to these franchises. It should eventually support any franchise with a meaningful chronology, such as:

- Star Wars
- Harry Potter / Wizarding World
- The Lord of the Rings
- Planet of the Apes
- X-Men
- Jurassic Park / Jurassic World
- Transformers
- Mission: Impossible
- Fast & Furious

### Franchise Timelines

The timeline is the central feature of Watchers Hub.

Each franchise has a curated timeline containing all relevant media, organized according to when the events take place within its universe rather than their release dates.

Supported media types include:

- Movies
- Television series and seasons
- Individual episodes
- One-Shots
- Special Presentations
- Other franchise-related media where appropriate

Timelines should support franchise-specific organizational structures, including:

- Chronological order
- Phases and eras
- Different universes and continuities
- Alternate timelines and branches

The timeline should make it easy to understand how different entries connect and where each one belongs within the larger franchise.

### Viewing Progress

Users can track their progress through every franchise.

Features include:

- Mark movies and other standalone entries as watched.
- Track individual episodes within television series.
- Keep track of progress through seasons and series.
- Save playback positions to resume where they left off.
- See which entries are completed, in progress or not yet watched.
- Track how many times an entry has been watched.

Progress should be maintained per user and associated with the relevant franchise timeline.

### Franchise Completion

Watchers Hub should track more than individual viewing progress.

Users should be able to complete an entire franchise timeline and keep a history of their completed runs.

This includes:

- Overall franchise completion percentage.
- Number of completed entries.
- Number of times an entire franchise has been completed.
- Previous completion history.
- Current progress through a new run.

This makes it possible to revisit a franchise without losing the history of previous viewing sessions.

### Profiles & Statistics

Each user has a profile that displays their viewing activity and achievements.

Potential profile information includes:

- Followed franchises.
- Completed franchises.
- Total watched movies, episodes and specials.
- Total viewing time.
- Franchise completion counts.
- Viewing history.
- Personal favorites and ratings.

Profiles should provide an overview of a user's entertainment activity and progress across different franchises.

### Shared Timelines & Watchparties

Users should be able to create shared timelines with friends or family.

A shared timeline allows multiple people to follow the same franchise together while maintaining their own individual viewing progress.

Potential features include:

- Create private groups with friends or family.
- Invite other users to a shared timeline.
- Follow the same franchise chronology.
- See each member's individual viewing progress.
- View shared group progress.
- Track completed franchise runs together.

The goal is to make it easier to experience large franchises together without requiring everyone to maintain separate, disconnected watchlists.

## Data Sources

### TMDB

[The Movie Database (TMDB)](https://www.themoviedb.org/) will be the primary source for movie and television metadata.

This includes:

- Titles and descriptions.
- Release dates.
- Posters and backdrops.
- Cast and crew.
- Genres.
- Seasons and episodes.
- Streaming providers.
- Other movie and television metadata.

TMDB provides media information, while Watchers Hub maintains its own curated franchise timelines and viewing order.

The application should only store the external metadata necessary for its own functionality. Frequently requested data may be cached using Redis in the future.

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

### Tooling

- **Turborepo**
- **pnpm**
- **Docker Compose**

Docker is currently intended to run PostgreSQL during development.

## Project Goals

The main goal of Watchers Hub is to provide a central place to experience and track entertainment franchises.

It should make it easy to:

- Explore different entertainment franchises.
- Follow curated in-universe chronological timelines.
- Discover how movies, series and other media connect.
- Track individual viewing progress.
- Resume movies and episodes where you left off.
- Complete franchises multiple times and preserve completion history.
- View personal viewing statistics.
- Share timelines and viewing experiences with friends and family.

Watchers Hub should focus on the experience of following and completing franchises, rather than becoming another generic movie database.

## Future potential features

### Streaming Service Integrations

A potential future feature is connecting streaming services such as Netflix, Disney+ and Prime Video.

Where supported, Watchers Hub could automatically synchronize viewing activity and update a user's progress through franchise timelines.

This would reduce the need for manually marking movies and episodes as watched.

Availability would depend on the APIs and integration capabilities provided by each streaming service.
