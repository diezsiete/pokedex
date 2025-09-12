import { type ReactNode } from "react";
import FavoritesContext from "./FavoritesContext";
import useFavorites from "./useFavorites";

/**
 * Proveedor del contexto para comunicar Grid con Tarjeta de pokemon al momento de agregar o eliminar pokemon a favoritos
 */
export default function FavoritesProvider({ children } : { children: ReactNode }) {
    const favorites = useFavorites();
    return (
        <FavoritesContext value={favorites}>
            {children}
        </FavoritesContext>
    );
}