import { type ReactNode } from "react";
import FavoritesContext from "./FavoritesContext";
import useFavorites from "./useFavorites";

export default function FavoritesProvider({ children } : { children: ReactNode }) {
    const favorites = useFavorites();
    return (
        <FavoritesContext value={favorites}>
            {children}
        </FavoritesContext>
    );
}