import type { PokemonCard as PokemonCardType } from "@api/types.ts";
import PokemonCard from "@components/PokemonCard/PokemonCard.tsx";
import './Grid.css'

/**
 * Grid de pokemones
 */
export default function Grid({ pokemons }: { pokemons: PokemonCardType[] }) {
    return <div className="grid">
        {pokemons.map((pokemon, key) => <PokemonCard key={key} pokemon={pokemon} />)}
    </div>;
}