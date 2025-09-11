import { type TypedDocumentNode, gql } from "@apollo/client";
import type { Pokemon } from "./types.ts";

type GetPokemonVars = {
    name: string;
};

const GetPokemon: TypedDocumentNode<
    {pokemons: Pokemon[]},
    GetPokemonVars
> = gql`
    query GetPokemon($name: String!) {
        pokemons: pokemon(where: {name:  {_eq: $name}}) {
            id
            name
            height
            weight
            abilities: pokemonabilities {
                ability {
                    name
                }
            }
            specy: pokemonspecy {
                color: pokemoncolor {
                    name
                }
                description: pokemonspeciesflavortexts(where: {language_id: {_eq: 9}}, limit: 1) {
                    text: flavor_text
                }
            }
            sprites: pokemonsprites {
                sprites
            }
            stats: pokemonstats {
                id
                base: base_stat
                stat {
                    name
                }
            }
            types: pokemontypes {
                type {
                    name
                }
            }
        }
    }
`;

export default GetPokemon;