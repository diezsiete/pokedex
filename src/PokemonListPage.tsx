import { useState } from "react";
import { Link } from 'react-router'
import pokeball from './assets/pokeball.svg'
import { useListPokemonQuery, useGetSpeciesQuery } from "./api/ListPokemon";

export default function PokemonListPage() {
    const [search, setSearch] = useState("");
    const [sortFieldSelected, setSortFieldSelected] = useState('name');

    return (
        <div>
            <h2><img src={pokeball} className="logo react" alt="Pokeball logo"/> Pokédex</h2>

            <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <select name="orderBy" id="orderBy" onChange={(e) => setSortFieldSelected(e.target.value)}
                    defaultValue={sortFieldSelected}>
                {['id', 'name'].map(sortField => <option key={sortField} value={sortField}>
                    {sortField}
                </option>)}
            </select>

            <PokemonList search={search} sortField={sortFieldSelected} />
            {/*<PokemonSpecies search={search} sortField={sortFieldSelected} />*/}
        </div>
    );
}

function PokemonList({search = '', sortField = 'name'}: { search?: string; sortField?: string }) {
    const {loading, error, data} = useListPokemonQuery(search, sortField);

    if (loading) return <p>Loading...</p>;
    if (error || !data) return <p>Error :(</p>;

    return <>
        <ul>
            {data.list.map(p => {
                return <li key={p.id}><Link to={`/${p.name}`}>
                    {p.name} —{" #"} {String(p.id).padStart(3, '0')}
                    <img width="72" src={p.sprites[0].sprites.other['official-artwork']['front_default']}
                         alt="pokemon-reference"/>
                </Link>
                </li>
            })}
        </ul>
    </>;
}

function PokemonSpecies({search = '', sortField = 'name'}: { search?: string; sortField?: string }) {
    const {loading, error, data} = useGetSpeciesQuery(search, sortField);
    if (loading) return <p>Loading...</p>;
    if (error || !data) return <p>Error :(</p>;

    return <>
        <ul>
            {data.species.map(ps => {
                const p = ps.pokemons[0];
                return <li key={p.id}><Link to={`/${p.name}`}>
                    {p.name} —{" #"} {String(p.id).padStart(3, '0')}
                    <img width="72" src={p.sprites[0].sprites.other['official-artwork']['front_default']}
                         alt="pokemon-reference"/>
                </Link>
                </li>
            })}
        </ul>
    </>;
}