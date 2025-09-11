import { type TypedDocumentNode, gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { Pokemon, ListPokemon } from "./types.ts";

type ListVars = {
    where: {[k: string]: string|object};
    orderBy: {[k: string]: string}[];
};

const POKEMON_LIST: TypedDocumentNode<
    { pokemons: ListPokemon[] },
    ListVars
> = gql`
    query PokemonList($where: pokemon_bool_exp, $orderBy: [pokemon_order_by!]) {
        pokemons: pokemon(
            where: $where
            order_by: $orderBy
            limit: 50
        ) {
            id
            name
            sprites: pokemonsprites {
                sprites
            }
        }
    }
`;

export const SPECIES_LIST: TypedDocumentNode<
    { species: { pokemons: Pick<Pokemon, 'id'|'name'|'sprites'>[] }[]},
    ListVars
> = gql`
    query SpeciesList($where: pokemonspecies_bool_exp, $orderBy: [pokemonspecies_order_by!]) {
        species: pokemonspecies(
            where: $where
            order_by: $orderBy
            limit: 10
        ) {
            pokemons {
                id
                name
                sprites: pokemonsprites {
                    sprites
                }
            }
        }
    }
`;


export function usePokemonListQuery(search: string = '', sortField: string = 'name') {
    const where: ListVars['where'] = {};
    if (search.trim().length > 0) {
        where.name = {
            _like: `${search}%`
        }
    }

    // Pass the merged object as the 'where' variable.
    return useQuery(POKEMON_LIST, {
        variables: {
            where,
            orderBy: [{[sortField]: 'asc'}]
        },
    });
}

export function useSpeciesListQuery(search: string = '', sortField: string = 'name') {
    const where: ListVars['where'] = {
        generation: {name: {_eq: "generation-i"}},
        evolves_from_species_id:  {
            _is_null: true
        }
    };

    if (search.trim().length > 0) {
        where.name = {
            _like: `${search}%`
        }
    }

    return useQuery(SPECIES_LIST, {
        variables: {
            where,
            orderBy: [{[sortField]: 'asc'}]
        },
    });
}