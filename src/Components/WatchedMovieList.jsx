import React from 'react'
const average = arr => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)
const WatchedMovieList = ({ children }) => {
	return <div className="box">{children}</div>
}
export const WatchedMovieListButton = function ({ isOpen2, setIsOpen2 }) {
	return (
		<button className="btn-toggle" onClick={() => setIsOpen2(open => !open)}>
			{isOpen2 ? '–' : '+'}
		</button>
	)
}
export const WatchedMovieListSummary = function ({ watched }) {
	const avgImdbRating = average(watched.map(movie => movie.imdbRating))
	const avgUserRating = average(watched.map(movie => movie.userRating))
	const avgRuntime = average(watched.map(movie => movie.runtime))
	return (
		<div className="summary">
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime} min</span>
				</p>
			</div>
		</div>
	)
}
// export const WatchedMovieListAdd = function ({ watched, handleRemoveWatchedMovie }) {
// 	return (
// 		<ul className="list">
// 			{watched.map(movie => (
// 				<>
// 					<li key={movie.imdbID}>
// 						{console.log(movie.imdbID)}
// 						<img src={movie.poster} alt={`${movie.title} poster`} />
// 						<h3>{movie.title}</h3>
// 						<div>
// 							<p>
// 								<span>⭐️</span>
// 								<span>{movie.imdbRating}</span>
// 							</p>
// 							<p>
// 								<span>🌟</span>
// 								<span>{movie.userRating}</span>
// 							</p>
// 							<p>
// 								<span>⏳</span>
// 								<span>{movie.runtime} min</span>
// 							</p>
// 							<button className="btn-delete" onClick={() => handleRemoveWatchedMovie(movie.imdbID)}>
// 								x
// 							</button>
// 						</div>
// 					</li>
// 				</>
// 			))}
// 		</ul>
// 	)
// }
export const WatchedMovieListAdd = function ({ watched, handleRemoveWatchedMovie }) {
	return (
		<>
			<ul className="list">
				{watched.map(movie => (
					<li key={movie.imdbID}>
						<img src={movie.poster} alt={`${movie.title} poster`} />
						<h3>{movie.title}</h3>
						<div>
							<p>
								<span>⭐️</span>
								<span>{movie.imdbRating}</span>
							</p>
							<p>
								<span>🌟</span>
								<span>{movie.userRating}</span>
							</p>
							<p>
								<span>⏳</span>
								<span>{movie.runtime} min</span>
							</p>
							<button className="btn-delete" onClick={() => handleRemoveWatchedMovie(movie.imdbID)}>
								X
							</button>
						</div>
					</li>
				))}
			</ul>
		</>
	)
}
export default WatchedMovieList
