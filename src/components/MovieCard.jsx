import { Link } from "react-router-dom"

export default function MovieCard({ movie }) {

    const slug = movie.Title.toLowerCase().replaceAll(" ", "-")

    const poster = movie.Poster !== "N/A"
        ? movie.Poster
        : "/no-image.png"

    return (
        <li>
            <article>
                <Link to={`/${slug}-${movie.imdbID}`} >
                    <h2>{movie.Title}</h2>
                    <p>{movie.Year}</p>
                    <img 
                        src={poster} 
                        alt={`Forsidebilde av filmen 
                        ${movie.Title}`}
                        onError={(e) => { e.target.src = "/no-image.png" }}
                    />
                </Link>
            </article>
        </li>
    )
}