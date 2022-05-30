import { API_KEY } from './env.js';

const clientLanguage = RegExp(/([a-z]{2})-([A-Z]{2})/).test(navigator.language)
  ? navigator.language
  : 'en-US';

const url = `https://api.themoviedb.org/3`;

const searchForm = document.getElementById('search-bar');
const searchInput = searchForm.elements['search-movie'];
const filterFavoritesButton = document.getElementById('favorites');
const moviesContainer = document.querySelector('section.movies-container');

const clearMoviesContainer = () => (moviesContainer.innerHTML = '');

function getFavoriteMoviesLocalStorage() {
  return JSON.parse(localStorage.getItem('favoriteMovies')) || [];
}

function addToFavoriteMoviesLocalStorage(movie) {
  const favoriteMovies = getFavoriteMoviesLocalStorage();

  localStorage.setItem(
    'favoriteMovies',
    JSON.stringify([...favoriteMovies, movie])
  );
}

function removeFromFavoriteMoviesLocalStorage(movieToRemove) {
  const favoriteMovies = getFavoriteMoviesLocalStorage();
  const filteredFavoriteMovies = favoriteMovies.filter(
    (movie) => movie.id !== movieToRemove.id
  );

  localStorage.setItem(
    'favoriteMovies',
    JSON.stringify(filteredFavoriteMovies)
  );
}

function createMovieOverview(overview) {
  const divMovieOverview = document.createElement('div');
  const paragraphOverview = document.createElement('p');

  divMovieOverview.classList.add('movie-overview');
  paragraphOverview.innerText = overview;

  divMovieOverview.appendChild(paragraphOverview);

  return divMovieOverview;
}

function createFavoriteButton(movieData, isFavorite) {
  const buttonFavorite = document.createElement('button');

  buttonFavorite.classList.add('favorite-btn');
  buttonFavorite.innerHTML = `
		<svg width="23" height="21" viewBox="0 0 23 21" class="favorite-icon" fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M20.2913 2.61183C19.7805 2.10083 19.1741 1.69547 18.5066 1.41891C17.8392 1.14235 17.1238 1 16.4013 1C15.6788 1 14.9634 1.14235 14.2959 1.41891C13.6285 1.69547 13.022 2.10083 12.5113 2.61183L11.4513 3.67183L10.3913 2.61183C9.3596 1.58013 7.96032 1.00053 6.50129 1.00053C5.04226 1.00053 3.64298 1.58013 2.61129 2.61183C1.5796 3.64352 1 5.04279 1 6.50183C1 7.96086 1.5796 9.36013 2.61129 10.3918L3.67129 11.4518L11.4513 19.2318L19.2313 11.4518L20.2913 10.3918C20.8023 9.88107 21.2076 9.27464 21.4842 8.60718C21.7608 7.93972 21.9031 7.22431 21.9031 6.50183C21.9031 5.77934 21.7608 5.06393 21.4842 4.39647C21.2076 3.72901 20.8023 3.12258 20.2913 2.61183V2.61183Z"
				stroke="#BA0707" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
		Favoritar
	`;

  isFavorite && buttonFavorite.classList.add('active');

  buttonFavorite.addEventListener('click', (e) => {
    const button = e.target;

    if (!button.classList.contains('active')) {
      addToFavoriteMoviesLocalStorage(movieData);
    } else {
      removeFromFavoriteMoviesLocalStorage(movieData);
    }

    button.classList.toggle('active');
  });

  return buttonFavorite;
}

function createRatingInfo(rating) {
  const spanRating = document.createElement('span');
  const imgStarIcon = document.createElement('img');

  imgStarIcon.src = '/assets/star.svg';
  imgStarIcon.alt = 'Ícone de estrela';

  spanRating.appendChild(imgStarIcon);
  spanRating.innerHTML += ' ' + rating;

  return spanRating;
}

function createMovieActions(movieData, isFavorite) {
  const divMovieActions = document.createElement('div');
  const ratingInfo = createRatingInfo(movieData.vote_average);
  const favoriteButton = createFavoriteButton(movieData, isFavorite);

  divMovieActions.classList.add('movie-actions');
  divMovieActions.appendChild(ratingInfo);
  divMovieActions.appendChild(favoriteButton);

  return divMovieActions;
}

function createMovieTitle(title, year) {
  const divMovieTitle = document.createElement('div');
  const h2Title = document.createElement('h2');
  const smallYear = document.createElement('small');

  divMovieTitle.classList.add('movie-title');
  h2Title.innerText = title;
  smallYear.innerText = year;

  divMovieTitle.appendChild(h2Title);
  divMovieTitle.appendChild(smallYear);

  return divMovieTitle;
}

function createMovieInfo(movieData, isFavorite) {
  const divMovieInfo = document.createElement('div');
  const movieTitle = createMovieTitle(movieData.title, movieData.release_date);
  const movieActions = createMovieActions(movieData, isFavorite);

  divMovieInfo.classList.add('movie-info');
  divMovieInfo.appendChild(movieTitle);
  divMovieInfo.appendChild(movieActions);

  return divMovieInfo;
}

function createMovieImg(src, alt) {
  const divMovieImg = document.createElement('div');
  const img = document.createElement('img');

  img.src = src;
  img.alt = alt;

  divMovieImg.classList.add('movie-img');
  divMovieImg.appendChild(img);

  img.addEventListener('error', (e) => {
    e.target.src = '/assets/image-not-found.svg';
    e.target.classList.add('not-found');
  });

  return divMovieImg;
}

function createMovieItem() {
  const sectionMovieItem = document.createElement('section');
  sectionMovieItem.classList.add('movie-item');

  return sectionMovieItem;
}

// Render movies from an array in the page
function renderMovies(movies) {
  const popularMovies = movies.map(
    ({ poster_path, title, vote_average, release_date, overview, id }) => {
      return {
        id,
        poster_path: `https://image.tmdb.org/t/p/w300${poster_path}`,
        title,
        vote_average:
          typeof vote_average === 'number'
            ? vote_average.toFixed(1)
            : vote_average,
        release_date: release_date.split('-')[0],
        overview,
      };
    }
  );

  const moviesElementsList = popularMovies.map((movie) => {
    const favoriteMovies = getFavoriteMoviesLocalStorage();
    const isFavorite =
      favoriteMovies.length === 0
        ? false
        : !!favoriteMovies.find(
            (favoriteMovie) => movie.id === favoriteMovie.id
          );

    const movieItem = createMovieItem();
    const movieImg = createMovieImg(movie.poster_path, `${movie.title} Poster`);
    const movieInfo = createMovieInfo(movie, isFavorite);
    const movieOverview = createMovieOverview(movie.overview);

    movieItem.appendChild(movieImg);
    movieItem.appendChild(movieInfo);
    movieItem.appendChild(movieOverview);

    return movieItem;
  });

  moviesElementsList.forEach((movieElement) =>
    moviesContainer.appendChild(movieElement)
  );
}

filterFavoritesButton.addEventListener('change', (e) => {
  searchInput.value = '';
  if (!e.target.checked) {
    getPopularMovies();
    return;
  }

  clearMoviesContainer();
  const favoriteMovies = getFavoriteMoviesLocalStorage();
  renderMovies(favoriteMovies);
});

// Asynchronously get movies by search query from the API
async function searchMoviesByName(query) {
  moviesContainer.innerHTML = '<div class="loading"></div>';
  filterFavoritesButton.checked = false;

  const searchParams = `/search/movie?query=${query}&language=${clientLanguage}&include_adult=false&api_key=`;
  const queryResults = await fetch(url + searchParams + API_KEY)
    .then((response) => response.json())
    .then((json) => json.results)
    .then((movies) => movies)
    .catch((error) => error);

  clearMoviesContainer();
  renderMovies(queryResults);
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value;
  const isValid = query.replace(/\s/g, '').length > 4;

  if (isValid) {
    searchMoviesByName(query);
    return;
  }

  searchForm.classList.add('invalid');
});

searchInput.addEventListener('input', () => {
  searchForm.classList.remove('invalid');
});

// Asynchronously get movies from the API
async function getPopularMovies() {
  const movies = await fetch(
    url + `/movie/popular?language=${clientLanguage}&api_key=` + API_KEY
  )
    .then((response) => response.json())
    .then((json) => json.results)
    .then((movies) => movies)
    .catch((error) => console.error(error));

  if (!movies) {
    moviesContainer.innerHTML = '<h2>An error occurred, please try again.</h2>';
    return;
  }

  clearMoviesContainer();
  renderMovies(movies);
}

getPopularMovies();
