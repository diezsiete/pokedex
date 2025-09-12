import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { LIST_POKEMON, LIMIT, fetchMoreListPokemon } from "@api/ListPokemon.ts";
import { useFavoritesContext } from "@context/favorites/FavoritesContext";
import Grid from "@components/Grid/Grid.tsx";
import GridPageHeader from "@components/GridPageHeader/GridPageHeader.tsx";
import './GridPage.css'

export default function GridPage() {
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [sortField, setSortField] = useState('name');
    const {favorites} = useFavoritesContext();
    const [inFavorites, setInFavorites] = useState(false)

    return <div className='main-container grid-page'>
        <GridPageHeader
            inFavorites={inFavorites}
            onInFavoritesChange={setInFavorites}
            onSearch={setSearch}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            sortField={sortField}
            onSortFieldChange={setSortField}
        />

        <PokemonApiGrid
            search={search}
            sortField={sortField}
            typeFilter={typeFilter}
            ids={inFavorites ? favorites : undefined}
            infiniteScroll={!inFavorites}
        />
    </div>;
}

type PokemonApiGridProps = { search: string, sortField: string, typeFilter: string, ids?: number[], infiniteScroll?: boolean };

function PokemonApiGrid({ search, sortField, typeFilter, ids, infiniteScroll }: PokemonApiGridProps) {
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const {loading, error, data, fetchMore} = useQuery(LIST_POKEMON, {variables: {
        where: {
            name: {_ilike: search ? `%${search}%` : '%'},
            ...(ids ? {id: {_in: ids}} : {}),
            ...(typeFilter ? {
                pokemontypes:  {
                    type:  {
                        name:  {
                            _eq: typeFilter
                        }
                    }
                }
            } : {})
        },
        orderBy: [{[sortField]: 'asc'}],
        limit: LIMIT,
        offset: 0,
    }});

    const pokemons = useMemo(() => data?.pokemons ?? [], [data]);

    // Hook funcionalidad de scroll infinito.
    // para loadMoreRef en deteccion de interseccion, se dispara obtener mas pokemones de la api
    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading && pokemons.length) {
                fetchMoreListPokemon(pokemons.length, fetchMore)
            }
        });

        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [loading, pokemons, fetchMore]);

    return (
        <main className='grid-page-main inner-shadow'>
            {!pokemons.length || error
                ? <p>{error ? 'Error :(' : (loading ? 'Loading...' : 'Not found')}</p>
                : <Grid pokemons={pokemons}/>}
            {infiniteScroll && <div ref={loadMoreRef} className="h-10 col-span-full"></div>}
        </main>
    )
}

