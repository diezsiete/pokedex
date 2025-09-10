import { Link } from 'react-router'
import {useQuery} from "@apollo/client/react";
import pokeball from './assets/pokeball.svg'
import GET_SPECIES from "./api/GET_SPECIES.ts";
import {useState} from "react";

export default function PokemonListPage() {
    return (
        <div>
            <h2><img src={pokeball} className="logo react" alt="Pokeball logo"/> Pokédex</h2>
            <br/>
            <PokemonSpecies/>
        </div>
    );
}

function PokemonSpecies() {
    const [sortFieldSelected, setSortFieldSelected] = useState('id');
    const {loading, error, data} = useQuery(GET_SPECIES, {
        variables: { orderBy: { [sortFieldSelected]: 'asc' } },
    });
    if (loading) return <p>Loading...</p>;
    if (error || !data) return <p>Error :(</p>;

    return <>
        <select name="orderBy" id="orderBy" onChange={(e) => setSortFieldSelected(e.target.value)} defaultValue={sortFieldSelected}>
            {['id', 'name'].map(sortField => <option key={sortField} value={sortField}>
                {sortField}
            </option>)}
        </select>
        <ul>
            {data.species.map(ps => {
                const p = ps.pokemons[0];
                return <li key={p.id}><Link to={`/${p.name}`}>
                    {p.name} —{" #"} {String(p.id).padStart(3, '0')}
                    <img width="72" src={p.pokemonsprites[0].sprites.other['official-artwork']['front_default']} alt="pokemon-reference" />
                </Link>
                </li>
            })}
        </ul>
    </>;
}