import { useEffect, useRef, useState } from "react";
import { useListPokemonQuery, LIMIT } from "@api/ListPokemon.ts";
import type { PokemonCard } from "@api/types.ts";
import SearchBar from "@components/SearchBar/SearchBar";
import Grid from "@components/Grid/Grid.tsx";
import SortField from "@components/SortField/SortField.tsx";
import pokeball from '@assets/pokeball.svg'
import './GridPage.css'

type ApolloResult = ReturnType<typeof useListPokemonQuery>;

export default function GridPage() {
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState('name');
    const {loading, error, data, fetchMore} = useListPokemonQuery(search, sortField);

    const pokemons = data?.pokemons ?? []

    const loadMoreRef = useIntersectionObserver(loading, pokemons, fetchMore)

    return <div className='main-container grid-page'>
        <header className="grid-page-header">
            <div className="title">
                <img src={pokeball} alt="Pokeball logo"/>
                <h1>Pokédex</h1>
            </div>
            <div className="filters">
                <SearchBar search={search} onChange={setSearch} />
                <SortField field={sortField} onChange={setSortField} />
            </div>
        </header>
        <main className='grid-page-main inner-shadow'>
            {!pokemons.length || error ? <p>{error ? 'Error :(' : 'Loading...'}</p> : <Grid pokemons={pokemons} />}
            <div ref={loadMoreRef} className="h-10 col-span-full"></div>
        </main>
    </div>;
}

/**
 * Hook funcionalidad de scroll infinito.
 * Retorna ref para un elemento que en deteccion de interseccion, se dispare obtener mas pokemones de la api
 */
function useIntersectionObserver(loading: boolean, pokemons: PokemonCard[], fetchMore: ApolloResult['fetchMore']) {
    const loadMoreRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading) {
                fetchMore({
                    variables: {
                        offset: pokemons.length,
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
                });
            }
        });

        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [loading, pokemons, fetchMore]);

    return loadMoreRef;
}