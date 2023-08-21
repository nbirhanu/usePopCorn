import React, { useEffect, useState } from 'react'
import StarRating from './StarRating'
const key = 'dde335f4'
const MovieDetails = ({ selectedId, handleCloseMovieDetails, addWatchedMovie, watched }) => {
	const [movieD, setMovieD] = useState({})
	const [loading, setLoading] = useState(false)
	const [userRating, setUserRating] = useState('')
	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movieD
	//
	const [isTop, setIsTop] = useState(imdbRating > 8)
	console.log(isTop)
	//
	const addMovie = function () {
		const newMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(' ').at(0)),
			userRating,
			// countRatingDecisions: countRef.current,
		}
		addWatchedMovie(newMovie)
		handleCloseMovieDetails()
	}
	//
	const isWatched = watched.map(watched => watched.imdbID).includes(selectedId)
	//
	useEffect(
		function () {
			async function fetchMovieDetails() {
				setLoading(true)
				const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`)
				const data = await res.json()
				setMovieD(data)
				// console.log(data)
				setLoading(false)
			}
			fetchMovieDetails()
		},
		[selectedId]
	)
	useEffect(
		function () {
			document.title = `movie | ${title}`
			return function () {
				document.title = 'usePopCorn'
			}
		},

		[title]
	)
	return (
		<div className="details">
			{loading ? (
				<p className="loader">LOADING...</p>
			) : (
				<>
					<header>
						<button className="btn-back" onClick={handleCloseMovieDetails}>
							&larr;
						</button>
						<img src={poster} alt={`Poster of ${movieD} movie`} />
						<div className="details-overview">
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐️</span>
								{imdbRating} IMDb rating
							</p>
						</div>
					</header>
					<section>
						<div className="rating">
							{isWatched ? (
								<p>YOU RATED THIS MOVIE</p>
							) : (
								<>
									<StarRating maxRating={10} size={24} onSetRating={setUserRating} />
									<button className="btn-add" onClick={addMovie}>
										+ add to list
									</button>
								</>
							)}
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</>
			)}
		</div>
	)
}

export default MovieDetails
