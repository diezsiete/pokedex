import { useCallback, useState } from "react";

const KEY = 'favorites';

/**
 * Custom hook utilizado en contexto de favoritos
 * Se guardan los ids de los pokemones favoritos en LocalStorage.
 * En la seccion de favoritos la consulta se filtra por estos.
 */
export default function useFavorites() {
    const readValue = (): number[] => {
        try {
            const item = localStorage.getItem(KEY);
            return item ? JSON.parse(item) : [];
        } catch {
            return [];
        }
    };
    const [favorites, setFavorites] = useState(readValue);

    const save = useCallback((newFavorites: number[]) => {
        setFavorites(newFavorites);
        localStorage.setItem(KEY, JSON.stringify(newFavorites))
    }, []);

    const addFavorite = useCallback((value: number) => {
        save((prev => {
            const updated = [...prev];
            if (!updated.includes(value)) updated.push(value);
            return updated;
        })(favorites));
    }, [favorites, save]);

    const removeFavorite = useCallback((value: number) => {
        save(favorites.filter(item => item !== value));
    }, [favorites, save]);

    const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites]);

    return { favorites, addFavorite, removeFavorite, isFavorite };
}