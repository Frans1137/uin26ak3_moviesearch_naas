export default function History({history, setSearch}){
    
    const handleChange = (e)=>{
        setSearch(e.target.value)
    }

    return (
        <select 
            onChange={handleChange}
            // value="" // kommentert ut denne så jeg kan velge alle alternative tidligere søkeord fra liste
            disabled={history.length === 0} 
            >
            {history.length > 0 ? (
            history?.map((item, i) => ( 
                <option key={i} value={item}>
                    {item}
                </option>
            )) 
        ) : (
                // <option value="">Ingen søk</option> // kommentert ut for å fjerne value=""
                <option>Ingen søk</option>
            )}
                </select>
        )
    }