const movies = [
  {
    poster:
      'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg',
    title: 'Spider-Man: Far From Home',
    rating: 7.5,
    release: '2019',
    overview:
      'Peter Parker and his friends go on a summer trip to Europe. However, they will hardly be able to rest - Peter will have to agree to help Nick Fury uncover the mystery of creatures that cause natural disasters and destruction throughout the continent.',
  },
  {
    poster:
      'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg',
    title: 'Sonic the Hedgehog 2',
    rating: 7.8,
    release: '2022',
    overview:
      'After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true hero. His test comes when Dr. Robotnik returns, this time with a new partner, Knuckles, in search for an emerald that has the power to destroy civilizations. Sonic teams up with his own sidekick, Tails, and together they embark on a globe-trotting journey to find the emerald before it falls into the wrong hands.',
  },
  {
    poster:
      'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/teCy1egGQa0y8ULJvlrDHQKnxBL.jpg',
    title: 'Hotel Transylvania: Transformania',
    rating: 7.1,
    release: '2022',
    overview: `When Van Helsing's mysterious invention, the "Monsterfication Ray," goes haywire, Drac and his monster pals are all transformed into humans, and Johnny becomes a monster. In their new mismatched bodies, Drac and Johnny must team up and race across the globe to find a cure before it's too late, and before they drive each other crazy.`,
  },
  {
    poster:
      'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/eO0QV5qJaEngP1Ax9w3eV6bJG2f.jpg',
    title: 'Halo',
    rating: 8.6,
    release: '2022',
    overview:
      'Depicting an epic 26th-century conflict between humanity and an alien threat known as the Covenant, the series weaves deeply drawn personal stories with action, adventure and a richly imagined vision of the future.',
  },
  {
    poster:
      'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/tlZpSxYuBRoVJBOpUrPdQe9FmFq.jpg',
    title: 'Uncharted',
    rating: 7.2,
    release: '2022',
    overview:
      'A young street-smart, Nathan Drake and his wisecracking partner Victor “Sully” Sullivan embark on a dangerous pursuit of “the greatest treasure never found” while also tracking clues that may lead to Nathan’s long-lost brother.',
  },
  {
    poster:
      'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg',
    title: 'Encanto',
    rating: 7.7,
    release: '2021',
    overview: `The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family with a unique gift from super strength to the power to heal—every child except one, Mirabel. But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family's last hope.`,
  },
  {
    poster:
      'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    title: 'Spider-Man: No Way Home',
    rating: 8.1,
    release: '2021',
    overview:
      'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.',
  },
];

const moviesContainer = document.querySelector('section.movies-container');

function createMovieOverview(overview) {
  const divMovieOverview = document.createElement('div');
  const paragraphOverview = document.createElement('p');

  divMovieOverview.classList.add('movie-overview');
  paragraphOverview.innerText = overview;

  divMovieOverview.appendChild(paragraphOverview);

  return divMovieOverview;
}

function createFavoriteButton() {
  const buttonFavorite = document.createElement('button');

  buttonFavorite.innerHTML = `
		<svg width="23" height="21" viewBox="0 0 23 21" class="favorite-icon" fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M20.2913 2.61183C19.7805 2.10083 19.1741 1.69547 18.5066 1.41891C17.8392 1.14235 17.1238 1 16.4013 1C15.6788 1 14.9634 1.14235 14.2959 1.41891C13.6285 1.69547 13.022 2.10083 12.5113 2.61183L11.4513 3.67183L10.3913 2.61183C9.3596 1.58013 7.96032 1.00053 6.50129 1.00053C5.04226 1.00053 3.64298 1.58013 2.61129 2.61183C1.5796 3.64352 1 5.04279 1 6.50183C1 7.96086 1.5796 9.36013 2.61129 10.3918L3.67129 11.4518L11.4513 19.2318L19.2313 11.4518L20.2913 10.3918C20.8023 9.88107 21.2076 9.27464 21.4842 8.60718C21.7608 7.93972 21.9031 7.22431 21.9031 6.50183C21.9031 5.77934 21.7608 5.06393 21.4842 4.39647C21.2076 3.72901 20.8023 3.12258 20.2913 2.61183V2.61183Z"
				stroke="#BA0707" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
		Favoritar
	`;

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

function createMovieActions(rating) {
  const divMovieActions = document.createElement('div');
  const ratingInfo = createRatingInfo(rating);
  const favoriteButton = createFavoriteButton();

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

function createMovieInfo(title, year, rating) {
  const divMovieInfo = document.createElement('div');
  const movieTitle = createMovieTitle(title, year);
  const movieActions = createMovieActions(rating);

  divMovieInfo.classList.add('movie-info');
  divMovieInfo.appendChild(movieTitle);
  divMovieInfo.appendChild(movieActions);

  return divMovieInfo;
}

function createMovieImg(src, alt) {
  const divMovieImg = document.createElement('div');
  const img = document.createElement('img');

  divMovieImg.classList.add('movie-img');
  img.src = src;
  img.alt = alt;
  divMovieImg.appendChild(img);

  return divMovieImg;
}

function createMovieItem() {
  const sectionMovieItem = document.createElement('section');
  sectionMovieItem.classList.add('movie-item');

  return sectionMovieItem;
}

(function renderMovies() {
  const moviesElementsList = movies.map(
    ({ poster, title, rating, release, overview }) => {
      const movieItem = createMovieItem();
      const movieImg = createMovieImg(poster, `${title} Poster`);
      const movieInfo = createMovieInfo(title, release, rating);
      const movieOverview = createMovieOverview(overview);

      movieItem.appendChild(movieImg);
      movieItem.appendChild(movieInfo);
      movieItem.appendChild(movieOverview);

      return movieItem;
    }
  );

  moviesElementsList.forEach((movieElement) =>
    moviesContainer.appendChild(movieElement)
  );
})();
