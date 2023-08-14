import React from 'react'

const MovieList = ({ children }) => {
	return <div className="box">{children}</div>
}
export const MovieListButton = function ({ isOpen1, setIsOpen1 }) {
	return (
		<button className="btn-toggle" onClick={() => setIsOpen1(open => !open)}>
			{isOpen1 ? '–' : '+'}
		</button>
	)
}
export const SearchMovieList = function ({ movies, isOpen1, handleSelectedIdMovie }) {
	return (
		<>
			{isOpen1 && (
				<ul className="list list-movies">
					{movies?.map(movie => (
						<li key={movie.imdbID} onClick={() => handleSelectedIdMovie(movie.imdbID)}>
							<img src={movie.Poster} alt={`${movie.Title} poster`} />
							<h3>{movie.Title}</h3>
							<div>
								<p>
									<span>🗓</span>
									<span>{movie.Year}</span>
								</p>
							</div>
						</li>
					))}
				</ul>
			)}
		</>
	)
}

export default MovieList
