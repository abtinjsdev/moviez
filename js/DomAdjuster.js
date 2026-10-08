let nameapi;

let typeapi;

const from = document.querySelector(".form");

const button = document.querySelector(".button");

const header = document.querySelector("#n-1");

/**
 * Resolves the user's movie or series search data.
 *
 * @returns {Promise<Object>} The search name and selected content type.
 */
const dataReady = new Promise((resolve) => {

  button.addEventListener("click", function (e) {

    e.preventDefault();

    const movie = document.querySelector(".movie");

    const series = document.querySelector(".series");

    nameapi = document.querySelector("#name").value;

    if (movie.checked) {

      typeapi = "movie";

    }

    if (series.checked) {

      typeapi = "series";

    }

    from.style.display = "none";

    header.style.display = "none";

    resolve({
      nameapi,
      typeapi
    });

  });

});

export { dataReady };