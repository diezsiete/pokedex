import { Link } from 'react-router'
import type { ListPokemon } from "@api/types.ts";
import { formatPokemonName, formatPokemonId } from "@util/format";
import './PokemonCard.css';

export default function PokemonCard({ pokemon }: { pokemon: ListPokemon }) {
    return (
        <Link to={`/${pokemon.name}`} className="pokemon-card">
            <div className="pokemon-half-background"></div>
            <div className="pokemon-number">{formatPokemonId(pokemon.id)}</div>
            <img className='pokemon-image' src={pokemon.sprites[0].sprites.other['official-artwork']['front_default']} alt="pokemon-img"/>
            <div className="pokemon-name">{formatPokemonName(pokemon.name)}</div>
        </Link>
    )
}