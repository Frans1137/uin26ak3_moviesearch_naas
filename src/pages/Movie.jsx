import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import MovieDetails from "../components/MovieDetails"

export default function Movie() {

    const { movie } = useParams()
    const [film, setFilm] = useState(null)

    // Jeg fikk litt trøbbel med API-fetch slik vi gikk gjennom i workshop, og etter noen runder med ChatGPT fant
    // jeg en alternativ (men mer rotete) måte å løse det på som fungerte som ønsket. 
    const apiKey = import.meta.env.VITE_OMDB_API_KEY
    const imdbID = movie.slice(movie.lastIndexOf("-") + 1)

    useEffect(() => {
        // Eget komponent for å hente detaljer om film når man trykker inn på egen side. Mer fleksibel og oversiktlig løsning (synes jeg).
        const getMovieDetails = async () => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
                
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
    , [apiKey, imdbID]
)

    if (!film) {
        return <p>Henter informasjon om film..</p>
    }

    const poster = film.Poster !== "N/A" ? film.Poster : "/no-image.png"

    return (
        <main>
            <header>
                <h1>{film.Title}</h1>
            </header>
            <article className="moviePage">
                <section>   
                    <img 
                        src={poster} 
                        alt={`Forsidebilde av ${film.Title}`}
                        onError={(e)=>{
                            e.target.src = "/no-image.png"
                        }} />
                </section>
                <section className="movieDetails">
                <MovieDetails movie={film} />
                </section>
            </article>
        </main>
    )
}