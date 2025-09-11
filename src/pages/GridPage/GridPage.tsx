import {useEffect, useMemo, useRef, useState} from "react";
import { useListPokemonQuery, fetchMoreListPokemon } from "@api/ListPokemon.ts";
import SearchBar from "@components/SearchBar/SearchBar";
import Grid from "@components/Grid/Grid.tsx";
import SortField from "@components/SortField/SortField.tsx";
import pokeball from '@assets/pokeball.svg'
import './GridPage.css'


export default function GridPage() {
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState('name');
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const {loading, error, data, fetchMore} = useListPokemonQuery(search, sortField);

    const pokemons = useMemo(() => data?.pokemons ?? [], [data])

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
            {!pokemons.length || error
                ? <p>{error ? 'Error :(' : (loading ? 'Loading...' : 'Not found')}</p>
                : <Grid pokemons={pokemons} />}
            <div ref={loadMoreRef} className="h-10 col-span-full"></div>
        </main>
    </div>;
}