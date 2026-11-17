Moviez

A modern movie and TV series discovery application built with Vanilla JavaScript, HTML, and CSS. Moviez allows users to search for movies and television series, explore essential information, view IMDb ratings, read plot summaries, and watch YouTube trailers.

FEATURES

- Movie & TV Series Search: Search for movies or television series by title.
- Dynamic Results: Automatically generates content cards based on search results.
- IMDb Integration: Access IMDb IDs, ratings, and additional information.
- Detailed Information: Explore genres, cast members, plot summaries, and total seasons.
- Trailer Integration: Watch available YouTube trailers directly within the application.
- Loading Indicators: Visual feedback during API requests.
- Error Handling: Handles unsuccessful searches, missing information, and request timeouts.
- Responsive Design: Optimized layouts for desktop, tablet, and mobile devices.
- Interactive UI: Expandable information sections and interactive movie posters.

TECHNOLOGIES USED

- HTML5
- CSS3
- JavaScript (ES6+)
- OMDb API
- TMDB API
- YouTube Embedded Player

APIs

OMDb API

Used to retrieve movie and series search results, IMDb identifiers, posters, ratings, genres, actors, and plot information.

The Movie Database (TMDB) API

Used to retrieve additional media information and locate available YouTube trailers through IMDb identifiers.

PROJECT STRUCTURE

```text
Moviez/
├── index.html
├── style.css
├── src/
│   └── logo.png
├── js/
│   ├── DomAdjuster.js
│   └── logic.js
└── aveline-eleganza-font/
```

CORE DEVELOPMENT CONCEPTS

- JavaScript ES6+ modules
- Asynchronous JavaScript
- Promises and async/await
- Fetch API
- REST API integration
- DOM manipulation
- Event handling
- Object-oriented programming (OOP)
- JavaScript classes and methods
- Template literals and dynamic HTML rendering
- Error handling with try/catch/finally
- AbortController and request timeouts
- Responsive web design

INSTALLATION

1. Clone the repository:

```bash
git clone https://github.com/abtinjsdev/moviez.git
```

2. Navigate to the project directory:

```bash
cd moviez
```

3. Open the project using a local development server, such as the Live Server extension in VS Code.

ENVIRONMENT CONFIGURATION

Moviez requires valid API keys from:

- OMDb API: https://www.omdbapi.com/apikey.aspx
- TMDB: https://www.themoviedb.org/settings/api

Configure your API credentials before running the application. For production, API keys should be protected using a backend rather than exposed in client-side JavaScript.

DEVELOPER

Abtin Shahrabadi

Frontend Developer | JavaScript Enthusiast

GitHub: https://github.com/abtinjsdev

Moviez is a personal development project focused on strengthening JavaScript skills, API integration, asynchronous programming, and dynamic frontend development.
