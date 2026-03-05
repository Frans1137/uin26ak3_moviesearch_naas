import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import MovieDetails from "../components/MovieDetails"

export default function Movie() {

    const { movie } = useParams()
    const [film, setFilm] = useState(null)

    const apiKey = import.meta.env.VITE_OMDB_API_KEY
    const imdbID = movie.split("-").pop()

    useEffect(() => {

        const getMovieDetails = async () => {
            try {
                const response = await fetch(
                    `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`
                )

                const data = await response.json()

                if (data.Response === "True") {
                    setFilm(data)
                }

            } catch (err) {
                console.error("Feil ved henting av film:", err)
            }
        }

        getMovieDetails()
    }
    , []
)

    if (!film) {
        return <p>Henter informasjon om film</p>
    }

    const poster = film.Poster !== "N/A" ? film.Poster : "/no-image.png"

    return (
        <main>
            <article className="movieList">
                <header>
                    <h1>{film.Title}</h1>
                </header>
                <img 
                    src={poster} 
                    alt={`Forsidebilde av ${film.Title}`}
                    onError={(e)=>{
                    e.target.src = "/no-image.png"
                }} />
                <MovieDetails movie={film} />
            </article>
        </main>
    )
}