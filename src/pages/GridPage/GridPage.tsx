import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { LIST_POKEMON, LIMIT, fetchMoreListPokemon } from "@api/ListPokemon.ts";
import SearchBar from "@components/SearchBar/SearchBar";
import Grid from "@components/Grid/Grid.tsx";
import SortField from "@components/SortField/SortField.tsx";
import FavoriteButton from "@components/FavoriteButton/FavoriteButton.tsx";
import { useFavoritesContext } from "@context/favorites/FavoritesContext";
import pokeball from '@assets/pokeball.svg'
import './GridPage.css'

export default function GridPage() {
    const [search, setSearch] = useState('');
    const [sortField, setSortField] = useState('name');
    const {favorites} = useFavoritesContext();
    const [inFavorites, setInFavorites] = useState(false)

    return <div className='main-container grid-page'>
        <header className="grid-page-header">
            <div className="title">
                <div className='brand'>
                    <img src={pokeball} alt="Pokeball logo"/>
                    <h1>Pokédex</h1>
                </div>
                <FavoriteButton active={inFavorites} onClick={() => setInFavorites(!inFavorites)} />
            </div>
            <div className="filters">
                <SearchBar onSearch={setSearch} />
                <SortField field={sortField} onChange={setSortField} />
            </div>
        </header>

        <PokemonApiGrid search={search} sortField={sortField} ids={inFavorites ? favorites : undefined} infiniteScroll={!inFavorites} />
    </div>;
}

type PokemonApiGridProps = { search: string, sortField: string, ids?: number[], infiniteScroll?: boolean };

function PokemonApiGrid({ search, sortField, ids, infiniteScroll }: PokemonApiGridProps) {
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const {loading, error, data, fetchMore} = useQuery(LIST_POKEMON, {variables: {
        where: {name: {_ilike: search ? `%${search}%` : '%'}, ...(ids ? {id: {_in: ids}} : {})},
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

