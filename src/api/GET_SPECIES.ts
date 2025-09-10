import { type TypedDocumentNode, gql } from "@apollo/client";
import type { PokemonSprites } from "./types.ts";

type Species = {
    species: { pokemons: Pokemon[] }[]
};
type Pokemon = {
    id: number;
    name: string;
    pokemonsprites: PokemonSprites[];
};

type GetSpeciesVars = {
    orderBy: {[k: string]: string};
};

const GET_SPECIES: TypedDocumentNode<
    Species,
    GetSpeciesVars
> = gql`
    query GetSpecies($orderBy: [pokemonspecies_order_by!]) {
        species: pokemonspecies(
            where: {
                generation: {name: {_eq: "generation-i"}}
                evolves_from_species_id:  {
                    _is_null: true
                }
            }
            order_by: $orderBy
            limit: 10
        ) {
            pokemons {
                id
                name
                pokemonsprites {
                    sprites
                }
            }
        }
    }
`;

export default GET_SPECIES;

// const GET_POKEMONS = gql`
//     query {
//         pokemons: pokemon(
//             limit: 10
//             order_by: {name: asc}
//         ) {
//             id
//             name
//             pokemonsprites {
//                 sprites
//             }
//             pokemontypes {
//                 type {
//                     name
//                 }
//             }
//         }
//     }
// `;