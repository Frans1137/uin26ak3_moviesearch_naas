import { Link } from "react-router-dom"

export default function MovieCard({ movie }) {
    if (!movie) return null

    const slug = movie.Title.toLowerCase()

    const poster = movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"

return (
    <li>
      <article className="movieCard">
          <Link to={`/${slug}-${movie.imdbID}`}>
            <h2>{movie.Title}</h2>
            <img
              src={poster}
              alt={`Forsidebilde av filmen ${movie.Title}`}
              onError={(e) => {
              e.target.src = "/no-image.png"
              }}
              />
              <p>Utgitt {movie.Year}</p>
          </Link>
      </article>
    </li>
  )
}