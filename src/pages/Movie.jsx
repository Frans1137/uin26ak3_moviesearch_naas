import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import MovieDetails from "../components/MovieDetails"

export default function Movie() {

    // useParams for å returnere dynamiske parametere fra URL som matcher rute.
    const { movie } = useParams() 
    const [film, setFilm] = useState(null)

    // Jeg fikk problemer med API-fetch slik vi gikk gjennom i workshop, og etter noen runder med ChatGPT fant
    // jeg en alternativ (men kanskje mer rotete?) måte å løse det på. Det fungerte som ønsket. 
    const apiKey = import.meta.env.VITE_OMDB_API_KEY
    const imdbID = movie.slice(movie.lastIndexOf("-") + 1)

    useEffect(() => {
        // Eget komponent (MovieDetails.jsx) for å hente detaljer om film når man trykker inn på egen side. Kunne like gjerne hatt den kode-biten her,
        // men jeg la det i eget komponent for å gi meg selv bedre oversikt. Opprinnelig tenkte jeg å kjøre funksjonen med drop-down meny. 
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
    }, [apiKey, imdbID]
)

    //Kan denne fjernes?
    if (!film) { 
        return <p>Henter informasjon om film..</p>
    }

    const poster = film.Poster !== "N/A" ? film.Poster : "/no-image.png" // mangler bilde-fil som skal erstatte manglende bilde, men hvis den legges til så er koden klar. 

    return (
        <main>
            <header>
                <h1>{film.Title}</h1>
            </header>
            <article className="moviePage">
                <section>   
                    <img // viser bilde hvis det eksisterer. 
                        src={poster} 
                        alt={`Forsidebilde av ${film.Title}`}
                        onError={(e)=>{
                            e.target.src = "/no-image.png" // Hvis ikke skal bilde no-image.png vises
                        }} />
                </section>
                <section className="movieDetails">
                <MovieDetails movie={film} /> {/* Henter/rendrer detaljer om film. Kan endres og oppdateres i MovideDetails.jsx */}
                </section>
            </article>
        </main>
    )
}