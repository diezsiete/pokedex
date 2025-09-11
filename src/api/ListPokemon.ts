import { type TypedDocumentNode, gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { Pokemon } from "./types.ts";

type ListVars = {
    where: {[k: string]: string};
    orderBy: {[k: string]: string};
};

const ListPokemon: TypedDocumentNode<
    { list: Pokemon[] },
    ListVars
> = gql`
    query ListPokemon($where: pokemon_bool_exp, $orderBy: [pokemon_order_by!]) {
        list: pokemon(
            where: $where
            order_by: $orderBy
            limit: 10
        ) {
            id
            name
            sprites: pokemonsprites {
                sprites
            }
        }
    }
`;

export const GetSpecies: TypedDocumentNode<
    { species: { pokemons: Pick<Pokemon, 'id'|'name'|'sprites'>[] }[]},
    ListVars
> = gql`
    query GetSpecies($where: pokemonspecies_bool_exp, $orderBy: [pokemonspecies_order_by!]) {
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


export function useListPokemonQuery(search: string = '', sortField: string = 'name') {
    const where = {};
    if (search.trim().length > 0) {
        where.name = {
            _like: `${search}%`
        }
    }

    // Pass the merged object as the 'where' variable.
    return useQuery(ListPokemon, {
        variables: {
            where,
            orderBy: [{[sortField]: 'asc'}]
        },
    });
}

export function useGetSpeciesQuery(search: string = '', sortField: string = 'name') {
    const where = {
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

    return useQuery(GetSpecies, {
        variables: {
            where,
            orderBy: [{[sortField]: 'asc'}]
        },
    });
}