import { type TypedDocumentNode, gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { PokemonCard } from "./types.ts";

type ListPokemonVars = {
    where: {[k: string]: string|object};
    orderBy: {[k: string]: string}[];
    limit: number;
    offset: number;
};

type ListPokemonResult = { pokemons: PokemonCard[] }

type ApolloResult = useQuery.Result<ListPokemonResult, ListPokemonVars>;

export const LIMIT = 50;

export const LIST_POKEMON: TypedDocumentNode<ListPokemonResult, ListPokemonVars> = gql`
    query GetPokemons($where: pokemon_bool_exp, $orderBy: [pokemon_order_by!], $limit: Int, $offset: Int) {
        pokemons: pokemon(
            where: $where
            order_by: $orderBy
            limit: $limit
            offset: $offset
        ) {
            id
            name
            sprites: pokemonsprites {
                src: sprites(path: "other.official-artwork.front_default")
            }
        }
    }
`;

export const fetchMoreListPokemon = (offset: number, fetchMore: ApolloResult['fetchMore']) => fetchMore({
    variables: {
        offset,
        limit: LIMIT,
    },
    updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
            pokemons: [
                ...prev.pokemons,
                ...fetchMoreResult.pokemons,
            ],
        };
    },
})