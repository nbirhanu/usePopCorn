import { useEffect, useState } from 'react'
import './App.css'
import Navigation from './Components/Navigation'
import MovieList from './Components/MovieList'
import WatchedMovieList from './Components/WatchedMovieList'
import { Logo, SearchBar, MovieListNumber } from './Components/Navigation'
import { MovieListButton, SearchMovieList } from './Components/MovieList'
import {
	WatchedMovieListButton,
	WatchedMovieListAdd,
	WatchedMovieListSummary,
} from './Components/WatchedMovieList'
import MovieDetails from './Components/MovieDetails'

const tempMovieData = [
	{
		imdbID: 'tt1375666',
		Title: 'Inception',
		Year: '2010',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
	},
	{
		imdbID: 'tt0133093',
		Title: 'The Matrix',
		Year: '1999',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
	},
	{
		imdbID: 'tt6751668',
		Title: 'Parasite',
		Year: '2019',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
	},
]

const tempWatchedData = [
	{
		imdbID: 'tt1375666',
		Title: 'Inception',
		Year: '2010',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
		runtime: 148,
		imdbRating: 8.8,
		userRating: 10,
	},
	{
		imdbID: 'tt0088763',
		Title: 'Back to the Future',
		Year: '1985',
		Poster:
			'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
		runtime: 116,
		imdbRating: 8.5,
		userRating: 9,
	},
]
const key = 'dde335f4'
// http://www.omdbapi.com/?apikey=[yourkey]&
function App() {
	const [query, setQuery] = useState('')
	const [movies, setMovies] = useState([])
	const [watched, setWatched] = useState([])
	const [isOpen1, setIsOpen1] = useState(true)
	const [isOpen2, setIsOpen2] = useState(true)
	const [isLoding, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [selectedId, setSelectedId] = useState(null)

	//
	const handleSelectedIdMovie = function (id) {
		setSelectedId(selectedId => (selectedId === id ? null : id))
	}
	const handleCloseMovieDetails = function () {
		setSelectedId(null)
	}
	const addWatchedMovie = function (movie) {
		setWatched(watched => [...watched, movie])
	}
	const handleRemoveWatchedMovie = function (id) {
		setWatched(watched => watched.filter(movie => movie.imdbID !== id))
	}
	//
	useEffect(
		function () {
			async function fetchMovie() {
				try {
					setIsLoading(true)
					const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`)
					if (!res.ok) {
						throw new error('Something is wrong with fetching movie')
					}
					const data = await res.json()
					setMovies(data.Search)
					setIsLoading(false)
					// console.log(data)
				} catch (error) {
					console.error(error.message)
					setError(error.message)
				} finally {
					setIsLoading(false)
				}
			}
			fetchMovie()
		},
		[query]
	)

	return (
		<>
			<Navigation query={query} movies={movies}>
				<Logo />
				<SearchBar query={query} setQuery={setQuery} />
				<MovieListNumber movies={movies} />
			</Navigation>
			<main className="main">
				<MovieList
					isOpen1={isOpen1}
					movie={movies}
					setIsOpen1={setIsOpen1}
					handleSelectedIdMovie={handleSelectedIdMovie}>
					{isLoding && <p className="loader">LOADING...</p>}
					{!isLoding && !error && (
						<>
							<MovieListButton isOpen1={isOpen1} setIsOpen1={setIsOpen1} />
							<SearchMovieList
								movies={movies}
								isOpen1={isOpen1}
								handleSelectedIdMovie={handleSelectedIdMovie}
							/>
						</>
					)}
					{error && (
						<div className="error">
							<span>⛔</span>
							{error}
						</div>
					)}
				</MovieList>

				<WatchedMovieList isOpen2={isOpen2} watched={watched} setIsOpen2={setIsOpen2}>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							handleCloseMovieDetails={handleCloseMovieDetails}
							addWatchedMovie={addWatchedMovie}
							watched={watched}
						/>
					) : (
						<>
							<WatchedMovieListButton isOpen2={isOpen2} setIsOpen2={setIsOpen2} />
							{isOpen2 && (
								<>
									<WatchedMovieListSummary watched={watched} />
									<WatchedMovieListAdd
										watched={watched}
										handleRemoveWatchedMovie={handleRemoveWatchedMovie}
									/>
								</>
							)}
						</>
					)}
				</WatchedMovieList>
			</main>
		</>
	)
}

export default App
