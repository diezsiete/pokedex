import {type TypedDocumentNode, gql} from "@apollo/client";
import type {PokemonSprites, PokemonType} from "./types.ts";

export type Pokemon = {
    id: number;
    name: string;
    pokemonsprites: PokemonSprites[];
    pokemontypes: PokemonType[];
};

type GetPokemonVars = {
    name: string;
};

const GET_POKEMON: TypedDocumentNode<
    {pokemons: Pokemon[]},
    GetPokemonVars
> = gql`
    query GetPokemon($name: String!) {
        pokemons: pokemon(
            where:  {
                name:  {
                    _eq: $name
                }
            }
        ) {
            id
            name
            pokemonsprites {
                sprites
            }
            pokemontypes {
                type {
                    name
                }
            }
        }
    }
`;

export default GET_POKEMON;