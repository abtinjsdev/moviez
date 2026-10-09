import { dataReady } from "./DomAdjuster.js";
alert('test')
dataReady.then(({ nameapi, typeapi }) => {

  const API_KEY =
    `https://www.omdbapi.com/?s=${encodeURIComponent(nameapi)}&type=${typeapi}&apikey=3afade43`;

  const TMDB_KEY = "8496b953b201e2e8c1163865062cbecb";

  /**
   * Generates an OMDb API URL for a specific IMDb ID.
   *
   * @param {string} ID - IMDb ID.
   * @returns {string} OMDb API URL.
   */
  const APIGEN = function (ID) {
    return `https://www.omdbapi.com/?i=${ID}&apikey=3afade43`;
  };

  /**
   * Fetches JSON data with a timeout limit.
   *
   * @param {string} API - The API URL.
   * @param {number} timeout - Maximum request time in milliseconds.
   * @returns {Promise<Object>} Parsed JSON response.
   */
  const fetchJSON = async function (API, timeout = 6000) {
    const controller = new AbortController();

    const timer = setTimeout(() => {
      controller.abort();
    }, timeout);

    try {
      const response = await fetch(API, {
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      return await response.json();

    } catch (error) {

      if (error.name === "AbortError") {
        throw new Error("Request took too long.");
      }

      throw error;

    } finally {
      clearTimeout(timer);
    }
  };

  /**
   * Fetches search results from OMDb.
   *
   * @param {string} API - OMDb search URL.
   * @returns {Promise<Object[]>} Search results.
   */
  const getJson = async function (API) {
    const loading = document.querySelector("#loading");

    try {

      if (loading) {
        loading.style.display = "flex";
      }

      const data = await fetchJSON(API);

      if (data.Response === "False") {
        document.body.insertAdjacentHTML(
          "beforeend",
          `
            <h1 class="error-not-found">
              NO MOVIE WAS FOUND !
            </h1>

            <p class="error-not-found">
              Check spelling or try again with another movie.
            </p>

            <img
              class="error-img"
              src="https://www.pngkey.com/png/full/15-151874_alert-icons-png-vector-error-icon.png"
            >
          `
        );

        return [];
      }

      return data.Search || [];

    } catch (error) {

      alert(error.message);
      console.warn(error);

      return [];

    } finally {

      if (loading) {
        loading.style.display = "none";
      }
    }
  };

  /**
   * Creates and adds movie or series cards.
   */
  class MakingAndAddingCards {

    /**
     * Creates a card from movie or series data.
     *
     * @param {Object} input - Movie or series data.
     */
    main(input) {

      console.log(input);

      const markup = `
        <div class="card">

          <h1 class="header">
            ${input.Title}
          </h1>

          <a
            target="_blank"
            href="https://www.imdb.com/title/${input.imdbID}"
          >
            <img
              id="poster"
              src="${input.Poster !== "N/A"
          ? input.Poster
          : "https://nftcalendar.io/storage/uploads/2022/02/21/image-not-found_0221202211372462137974b6c1a.png"
        }"
            >
          </a>

          <p class="year">
            ${input.Year} |
            <span class="span">
              Type : ${input.Type}
            </span>
          </p>

          <p class="imdbID">
            <span class="span2">
              Imdb id
            </span>
            : ${input.imdbID}
          </p>

          <svg
            class="details-toggle"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <div class="details"></div>

        </div>

        <br>
        <br>
        <hr>
      `;

      document.body.insertAdjacentHTML(
        "beforeend",
        markup
      );

      const cards = document.querySelectorAll(".details-toggle");
      const svg = cards[cards.length - 1];

      svg.addEventListener(
        "click",
        async function () {

          const details =
            this.parentElement.querySelector(".details");

          if (details.innerHTML !== "") {
            details.innerHTML = "";
            return;
          }

          details.innerHTML = `
            <div class="detail-loading">

              <div class="detail-spinner"></div>

              <p>
                Loading details...
              </p>

            </div>
          `;

          try {

            const data =
              await fetchJSON(
                APIGEN(input.imdbID)
              );

            const tmdbData =
              await fetchJSON(
                `https://api.themoviedb.org/3/find/${input.imdbID}?api_key=${TMDB_KEY}&external_source=imdb_id`
              );

            const tmdbResult =
              input.Type === "movie"
                ? tmdbData.movie_results?.[0]
                : tmdbData.tv_results?.[0];

            let trailer = null;

            if (tmdbResult) {

              const tmdbType =
                input.Type === "movie"
                  ? "movie"
                  : "tv";

              const videoData =
                await fetchJSON(
                  `https://api.themoviedb.org/3/${tmdbType}/${tmdbResult.id}/videos?api_key=${TMDB_KEY}`
                );

              trailer =
                videoData.results?.find(
                  video =>
                    video.type === "Trailer" &&
                    video.site === "YouTube"
                );
            }

            details.innerHTML = `
              <p id="genre">
                <span>Genre</span>:
                ${data.Genre || "N/A"}
              </p>

              <p id="actors">
                <span>Actors</span>:
                ${data.Actors || "N/A"}
              </p>

              <p id="imdb-rate">
                <span>IMDb Rating</span>:
                ${data.imdbRating || "N/A"}
              </p>

              <p id="total">
                <span>Total Seasons</span>:
                ${data.totalSeasons || "N/A"}
              </p>

              <p id="plot">
                <span>Plot</span>:
                ${data.Plot || "N/A"}
              </p>

              <div id="trailer">

                <span>Trailer</span>

                ${trailer
                ? `
                      <iframe
                        src="https://www.youtube.com/embed/${trailer.key}"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                      </iframe>
                    `
                : `
                      <p>
                        Trailer not available
                      </p>
                    `
              }

              </div>
            `;

          } catch (error) {

            details.innerHTML = `
              <div class="detail-error">

                <p>
                  ${error.message}
                </p>

              </div>
            `;

            console.warn(error);
          }
        }
      );
    }
  }

  getJson(API_KEY).then(results => {

    const card =
      new MakingAndAddingCards();

    results
      .filter(Boolean)
      .forEach(result => {
        card.main(result);
      });
  });
});