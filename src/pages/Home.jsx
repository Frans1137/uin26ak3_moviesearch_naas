import { useEffect, useState } from "react"
import SearchForm from "../components/SearchForm"
import MovieCard from "../components/MovieCard"

export default function Home(){
    const [movies, setMovies] = useState([])
    const [error] = useState(null)

    //jeg fikk trøbbel med API-fetch vi fikk i workshop. Noen runder med ChatGPT så fant jeg en annen løsning som fungerte for meg.
    //Fetcher fra API både her og i Movie.jsx. Det er kanskje uheldig når jeg tenker meg om, men jeg vet ikke om jeg har tid til å 
    //sette meg inn i hvordan jeg gjør det annerledes. Opprinnelig tenkte jeg å lage en "drop-down"-visning som skulle vise
    //detaljer om filmen, men gikk bort fra det når det viste seg å være vanskeligere enn først tenkt. Det gjorde nok at jeg klussa til 
    //litt med API-fetch, og ikke gikk tilbake til begynnelsen før jeg fortsatte oppgaven. 
    const apiKey = import.meta.env.VITE_OMDB_API_KEY

    const getMovies = async (query) => {
        if (!query || query.length < 3) return

        try {
            const response = await fetch(
                `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}` //Endret til query for å unngå at jeg klussa og blanda med search fra handleSubmit i SearchForm
            )

            const data = await response.json()
            if (data.Response === "True") {
                const uniqueMovies = 
                    [...new Map(data.Search.map(movie => [movie.imdbID, movie])).values()]
                setMovies(uniqueMovies)

                localStorage.setItem("lastSearch", query)
            } else {
                setMovies([])
            }
            } catch (err) {
                console.error("Feil ved henting av filmer", err)
            }
        }

    useEffect(()=>{

        //Henter 10 James Bond-filmer på startside. Jeg prøvde å få til så API-fetch ble lagret lokalt, slik at man kom tilbake 
        //til treff på siste søk når man gikk tilbake til Home, men det ble så mye ekstra at jeg valgte fjerne det før jeg hadde
        //fått det til å fungere helt. 
        const getJbMovies = async () => {
            try {
                const response = await fetch(
                    `https://www.omdbapi.com/?apikey=${apiKey}&s=James Bond&type=movie` )

                const data = await response.json()

                    if (data.Response === "True") {
                        setMovies(data.Search)
                    } else {
                        setMovies([])
                    }
            } catch (err) {
                console.error("Feil ved henting av Bond-filmer", err)
            }
        }
        getJbMovies()

    }, [apiKey]
)

    return (
        <main>
            <header>
                <h1>Forside</h1>
            </header>
            <SearchForm getMovies={getMovies} />
                <ul className="movieList">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                        />
                    ))}
                </ul>
                <p>{!error}Fant ingen filmer som matcher søket ditt</p>
        </main>
    )
}