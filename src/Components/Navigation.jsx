import React from 'react'

const Navigation = ({ children }) => {
	return <nav className="nav-bar">{children}</nav>
}

export const Logo = function () {
	return (
		<div className="logo">
			<span role="img">🍿</span>
			<h1>usePopcorn</h1>
		</div>
	)
}
export const SearchBar = function ({ query, setQuery }) {
	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={e => setQuery(e.target.value)}
		/>
	)
}
export const MovieListNumber = function ({ movies }) {
	return (
		<p className="num-results">
			Found <strong>X</strong> results
		</p>
	)
}
export default Navigation
