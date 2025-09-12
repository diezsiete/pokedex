import {createContext, useContext} from "react";
import useFavorites from "./useFavorites";

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