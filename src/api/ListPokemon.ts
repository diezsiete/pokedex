import { type TypedDocumentNode, gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { PokemonCard } from "./types.ts";

type ListVars = {
    where: {[k: string]: string|object};
    orderBy: {[k: string]: string}[];
    limit: number;
    offset: number;
};

export const LIMIT = 50;

const LIST_POKEMON: TypedDocumentNode<
    { pokemons: PokemonCard[] },
    ListVars
> = gql`
    query ListPokemon($where: pokemon_bool_exp, $orderBy: [pokemon_order_by!], $limit: Int, $offset: Int) {
        pokemons: pokemon(
            where: $where
            order_by: $orderBy
            limit: $limit
            offset: $offset
        ) {
            id
            name
            sprites: pokemonsprites {
                sprites
            }
        }
    }
`;


export function useListPokemonQuery(search: string = '', sortField: string = 'name') {
    const where: ListVars['where'] = {};
    if (search.trim().length > 0) {
        where.name = {
            _like: `${search}%`
        }
    }

    // Pass the merged object as the 'where' variable.
    return useQuery(LIST_POKEMON, {
        variables: {
            where,
            orderBy: [{[sortField]: 'asc'}],
            limit: LIMIT,
            offset: 0,
        },
    });
}