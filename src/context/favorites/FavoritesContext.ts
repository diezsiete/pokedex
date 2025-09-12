import {createContext, useContext} from "react";
import useFavorites from "./useFavorites";

/**
 * Se utiliza contexto para comunicar Grid con Tarjeta de pokemon al momento de agregar o eliminar pokemon a favoritos
 */
const FavoritesContext = createContext<ReturnType<typeof useFavorites>>({
    favorites: [],
    addFavorite: () => {},
    removeFavorite: () => {},
    isFavorite: () => false,
});

export default FavoritesContext;

export function useFavoritesContext() {
    return useContext(FavoritesContext);
}