import type { ListPokemon } from "@api/types.ts";
import PokemonCard from "@components/PokemonCard/PokemonCard.tsx";
import './Grid.css'

export default function Grid({ pokemons }: { pokemons: ListPokemon[] }) {
    return <div className="grid">
        {pokemons.map((pokemon, key) => <PokemonCard key={key} pokemon={pokemon} />)}
    </div>;
}