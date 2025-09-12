import { useEffect, useState } from "react";
import magnifyingGlass from '@assets/magnifying-glass.svg'
import './SearchBar.css';

/**
 * Input para buscar pokemones, realiza validación y debounce
 */
export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
    const [input, setInput] = useState('');

    // Función de validacion: mayor a 2 caracteres y sin caracteres especiales
    const isValidQuery = (str: string) => str.length > 2 && /^[a-zA-Z0-9 ]+$/.test(str);

    useEffect(() => {
        // setTimeout para debounce. Limitar request enviados si usuario escribe muy rapido
        const handler = setTimeout(() => {
            // Envia valor si vacio, para resetear lista, o si pasa validacion
            if (!input.length || isValidQuery(input)) {
                onSearch(input);
            }
        }, 300);
        return () => clearTimeout(handler);
    }, [input, onSearch]);

    return (
        <div className="search-box-container inner-shadow">
            <img src={magnifyingGlass} className="magnifying-glass" alt="magnifying-glass"/>
            <input type="text" className="search-box inner-shadow" placeholder="Search" value={input} id='searchInput'
                   onChange={(e) => setInput(e.target.value)} />
        </div>
    )
}