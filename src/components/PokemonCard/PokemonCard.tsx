import { type MouseEvent, useEffect, useState } from "react";
import { Link } from 'react-router'
import type { PokemonCard as PokemonCardType } from "@api/types.ts";
import FavoriteButton from "@components/FavoriteButton/FavoriteButton.tsx";
import { useFavoritesContext } from "@context/favorites/FavoritesContext.ts";
import { formatPokemonName, formatPokemonId } from "@util/format";
import './PokemonCard.css';

/**
 * Recuadros en Grid de pokemones, permite navegar a detalle y agregar a favoritos
 */
export default function PokemonCard({ pokemon }: { pokemon: PokemonCardType }) {
    const { addFavorite, removeFavorite, isFavorite } = useFavoritesContext();
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        setFavorite(isFavorite(pokemon.id));
    }, [pokemon, isFavorite]);

    const handleFavoriteClick = (e: MouseEvent) => {
        e.stopPropagation(); // para que no se haga navegación al detalle del pokemon
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