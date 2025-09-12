import { type MouseEvent, useEffect, useState } from "react";
import { Link } from 'react-router'
import type { PokemonCard as PokemonCardType } from "@api/types.ts";
import FavoriteButton from "@components/FavoriteButton/FavoriteButton.tsx";
import { useFavoritesContext } from "@context/favorites/FavoritesContext.ts";
import { formatPokemonName, formatPokemonId } from "@util/format";
import './PokemonCard.css';

export default function PokemonCard({ pokemon }: { pokemon: PokemonCardType }) {
    const { addFavorite, removeFavorite, isFavorite } = useFavoritesContext();
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        setFavorite(isFavorite(pokemon.id));
    }, [pokemon, isFavorite]);

    const handleFavoriteClick = (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const newState = !favorite
        setFavorite(newState)
        if (newState) {
            addFavorite(pokemon.id);
        } else {
            removeFavorite(pokemon.id);
        }
    }

    return <Link to={`/${pokemon.name}`} className="pokemon-card">
        <FavoriteButton active={favorite} onClick={handleFavoriteClick} />
        <div className="pokemon-half-background"></div>
        <div className="pokemon-number">{formatPokemonId(pokemon.id)}</div>
        <img className='pokemon-image' src={pokemon.sprites[0].src} alt="pokemon-img"/>
        <div className="pokemon-name">{formatPokemonName(pokemon.name)}</div>
    </Link>
}