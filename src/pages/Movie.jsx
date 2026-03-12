import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import MovieDetails from "../components/MovieDetails"

export default function Movie() {

    const { movie } = useParams() // useParams for å returnere dynamiske parametere fra URL som matcher rute.
    const [film, setFilm] = useState(null)

    // Jeg fikk problemer med API-fetch slik vi gikk gjennom i workshop, og etter noen runder med ChatGPT fant
    // jeg en alternativ (men kanskje mer rotete?) måte å løse det på. Det fungerte som ønsket. 
    const apiKey = import.meta.env.VITE_OMDB_API_KEY
    const imdbID = movie.slice(movie.lastIndexOf("-") + 1)

    useEffect(() => {
        // Eget komponent for å hente detaljer om film når man trykker inn på egen side. Oversiktlig løsning (synes jeg).
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

    const poster = film.Poster !== "N/A" ? film.Poster : "/no-image.png" // mangler bilde-fil som skal erstatte manglende bilde

    return (
        <main>
            <header>
                <h1>{film.Title}</h1>
            </header>
            <article className="moviePage">
                <section>   
                    <img // viser bilde hvis det eksisterer. Hvis ikke skal bilde no-image.png vises
                        src={poster} 
                        alt={`Forsidebilde av ${film.Title}`}
                        onError={(e)=>{
                            e.target.src = "/no-image.png"
                        }} />
                </section>
                <section className="movieDetails">
                <MovieDetails movie={film} /> {/* Henter/rendrer detaljer om film. Kan enkelt endres og oppdateres i eget komponent */}
                </section>
            </article>
        </main>
    )
}