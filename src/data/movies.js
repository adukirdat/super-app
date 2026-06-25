const makeMovie = (id, title, year, category) => ({
  id,
  title,
  year,
  category,
  description: `${title} is a ${category.toLowerCase()} recommendation selected for your Super App watchlist.`,
  image: `https://picsum.photos/seed/super-${category.toLowerCase()}-${id}/520/292`,
});

const moviesData = [
  {
    category: 'Action',
    movies: [
      makeMovie(1, 'Adam Project', 2022, 'Action'),
      makeMovie(2, 'The Tomorrow War', 2021, 'Action'),
      makeMovie(3, 'Top Gun: Maverick', 2022, 'Action'),
      makeMovie(4, 'Tenet', 2020, 'Action'),
    ],
  },
  {
    category: 'Thriller',
    movies: [
      makeMovie(5, 'Oxygen', 2021, 'Thriller'),
      makeMovie(6, 'Smile', 2022, 'Thriller'),
      makeMovie(7, 'The Gray Man', 2022, 'Thriller'),
      makeMovie(8, 'The Menu', 2022, 'Thriller'),
    ],
  },
  {
    category: 'Horror',
    movies: [
      makeMovie(9, 'M3GAN', 2022, 'Horror'),
      makeMovie(10, 'The Invitation', 2022, 'Horror'),
      makeMovie(11, 'Orphan: First Kill', 2022, 'Horror'),
      makeMovie(12, 'Ouija', 2014, 'Horror'),
    ],
  },
  {
    category: 'Drama',
    movies: [
      makeMovie(13, 'The Fabelmans', 2022, 'Drama'),
      makeMovie(14, 'Till', 2022, 'Drama'),
      makeMovie(15, 'Women Talking', 2022, 'Drama'),
      makeMovie(16, 'Aftersun', 2022, 'Drama'),
    ],
  },
  {
    category: 'Romance',
    movies: [
      makeMovie(17, 'Purple Hearts', 2022, 'Romance'),
      makeMovie(18, 'Look Both Ways', 2022, 'Romance'),
      makeMovie(19, 'The Last Letter', 2021, 'Romance'),
      makeMovie(20, 'About Fate', 2022, 'Romance'),
    ],
  },
  {
    category: 'Western',
    movies: [
      makeMovie(21, 'The Harder They Fall', 2021, 'Western'),
      makeMovie(22, 'Old Henry', 2021, 'Western'),
      makeMovie(23, 'News of the World', 2020, 'Western'),
      makeMovie(24, 'Hostiles', 2017, 'Western'),
    ],
  },
  {
    category: 'Fantasy',
    movies: [
      makeMovie(25, 'The School for Good and Evil', 2022, 'Fantasy'),
      makeMovie(26, 'Slumberland', 2022, 'Fantasy'),
      makeMovie(27, 'The Green Knight', 2021, 'Fantasy'),
      makeMovie(28, 'Pinocchio', 2022, 'Fantasy'),
    ],
  },
  {
    category: 'Music',
    movies: [
      makeMovie(29, 'Elvis', 2022, 'Music'),
      makeMovie(30, 'Tar', 2022, 'Music'),
      makeMovie(31, 'I Wanna Dance', 2022, 'Music'),
      makeMovie(32, 'Metal Lords', 2022, 'Music'),
    ],
  },
  {
    category: 'Fiction',
    movies: [
      makeMovie(33, 'Avatar', 2022, 'Fiction'),
      makeMovie(34, 'Dune', 2021, 'Fiction'),
      makeMovie(35, 'Nope', 2022, 'Fiction'),
      makeMovie(36, 'The Matrix', 1999, 'Fiction'),
    ],
  },
];

export default moviesData;
