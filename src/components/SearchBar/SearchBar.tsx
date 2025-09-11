import magnifyingGlass from '@assets/magnifying-glass.svg'
import './SearchBar.css';

type SearchBarProps = {
    search: string,
    onChange?: (search: string) => void,
}

export default function SearchBar({ search, onChange } : SearchBarProps) {
    return (
        <div className="search-box-container inner-shadow">
            <img src={magnifyingGlass} className="magnifying-glass" alt="magnifying-glass"/>
            <input type="text" className="search-box inner-shadow" placeholder="Search" value={search} id='searchInput'
                   onChange={(e) => onChange?.(e.target.value)}/>
        </div>
    )
}