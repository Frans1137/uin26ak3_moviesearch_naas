import { useState, useEffect } from "react";
import History from "./History";

export default function SearchForm({ getMovies }) {
    const [search, setSearch] = useState('')
    
// Siden knapp for slett tidligere søk skal ligge ved søkelinje valgte jeg å legge den i samme komponent som søk.
// Ved Ok setter den array i History til tom. Ved Cancel forblir søkehistorikk lagret. 
    const removeHistory = () => {
        if (!confirm("Vil du slette tidligere søk?")) return
        setHistory([])
}

// Tar imot fra handleSubmit - viser som element i HTML i bunnen av denne fila. 
const [history, setHistory] = useState(() => {
    try {
        const stored = localStorage.getItem("search")
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
})

    useEffect(()=>{
        localStorage.setItem("search", JSON.stringify(history))
    }, [history])

    const handleChange = (e)=>{
        const value = e.target.value
        setSearch(value)

        // satte funksjon getMovies og API-fetch til å skje ved 4 tegn
        if (value.length >= 4) {
            getMovies(value)
        }
    }
    
    // Tar imot søk fra input-felt (og fjerner mellomrom)
    const handleSubmit = (e)=>{
        e.preventDefault()
        if (!search.trim()) 
            return
        getMovies(search)

        setHistory(prev =>
            prev.includes(search) ? prev : [search, ...prev].slice(0, 10)
        )
    }

    return (
        <form className="searchForm" onSubmit={handleSubmit}>
            <label >
                <p>Søk etter film</p>
                <input
                    type="search"
                    placeholder="Harry Potter.."
                    value={search}
                    onChange={handleChange}
                />
            <button type="submit">Søk</button>
            </label>
            <section >
                <p>Dine lagrede søk</p>
                <History history={history} setSearch={setSearch} />
                <button type="button" onClick={removeHistory}>Slett lagrede søk</button>
            </section>
        </form>
    )
}