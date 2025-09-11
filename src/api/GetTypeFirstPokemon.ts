import { type TypedDocumentNode, gql } from "@apollo/client";
import type { Pokemon } from "./types.ts";

/**
 * Para un tipo de pokemon seleccionar el primer pokemon que solo sea de ese tipo
 * Util para saber el color de un tipo (aplica para pokemones con varios tipos, saber los colores despues del primero)
 */
const GET_TYPE_FIRST_POKEMON: TypedDocumentNode<
    { pokemon: Pick<Pokemon, 'specy'>[] },
    { name: string }
> = gql`
    query GetTypeFirstPokemon($typeName: String!) {
        pokemon: pokemon(
            pokemontypes_aggregate: {
                count: { predicate: { _eq: 1 } } # que solo tengan un tipo
            }
            pokemontypes: {
                type: { name: { _eq: $typeName } }
                slot: { _eq: 1 } # 1 = first type
            }
            limit: 1
        ) {
            specy: pokemonspecy {
                color: pokemoncolor {
                    name
                }
            }
        }
    }
`;

export default GET_TYPE_FIRST_POKEMON;