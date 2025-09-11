import { useState } from "react";
import pokeball from '@assets/pokeball.svg'
import { usePokemonListQuery } from "@api/PokemonList.ts";
import SearchBar from "@components/SearchBar/SearchBar";
import Grid from "@components/Grid/Grid.tsx";
import './GridPage.css'

export default function GridPage() {
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState('name');
    const {loading, error, data} = usePokemonListQuery(search, sortField);

    return <div className='main-container grid-page'>
        <header className="grid-page-header">
            <div className="title">
                <img src={pokeball} alt="Pokeball logo"/>
                <h1>Pokédex</h1>
            </div>
            <SearchBar search={search} sortField={sortField} onSearchChange={setSearch} onSortChange={setSortField}/>
        </header>
        <main className='grid-page-main inner-shadow'>
            {loading ? (
                <p>Loading...</p>
            ) : error || !data || !data.pokemons ? (
                <p>Error :(</p>
            ) : (
                <Grid pokemons={data.pokemons} />
            )}
            {/*<PokemonSpecies search={search} sortField={sortFieldSelected} />*/}
        </main>
    </div>;
}

// function PokemonSpecies({search = '', sortField = 'name'}: { search?: string; sortField?: string }) {
//     const {loading, error, data} = useSpeciesListQuery(search, sortField);
//     if (loading) return <p>Loading...</p>;
//     if (error || !data || !data.species) return <p>Error :(</p>;
//
//     return <>
//         <ul>
//             {data.species.map(ps => {
//                 const p = ps.pokemons[0];
//                 return <li key={p.id}><Link to={`/${p.name}`}>
//                     {p.name} —{" #"} {String(p.id).padStart(3, '0')}
//                     <img width="72" src={p.sprites[0].sprites.other['official-artwork']['front_default']}
//                          alt="pokemon-reference"/>
//                 </Link>
//                 </li>
//             })}
//         </ul>
//     </>;
// }