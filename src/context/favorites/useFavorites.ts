import { useCallback, useEffect, useState } from "react";

const KEY = 'favorites';

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

    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === KEY) setFavorites(readValue());
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    return { favorites, addFavorite, removeFavorite, isFavorite };
}