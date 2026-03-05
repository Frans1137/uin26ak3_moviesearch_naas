export default function MovieDetails({ movie }) {
  if (!movie) return null

  return (
    <>
        <p>Utgivelsesår: {movie.Year || "Ikke oppgitt"}</p>
        <p>Spilletid: {movie.Runtime || "Ikke oppgitt"}</p>
        <p>Skuespillere:{" "}
        {movie.Actors
            ? movie.Actors.split(",").slice(0, 5).join(", ")
            : "Ikke oppgitt"}</p>
        <p>Sjanger: {movie.Genre || "Ikke oppgitt"}</p>
        <p>Aldersgrense: {movie.Rated || "Ikke oppgitt"}</p>
        <p>Beskrivelse: {movie.Plot || "Ikke oppgitt"}</p>
    </>
  )
}