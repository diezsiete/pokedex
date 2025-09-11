import magnifyingGlass from '@assets/magnifying-glass.svg'
import './SearchBar.css';

type SearchBarProps = {
    search: string,
    sortField: string,
    onSearchChange?: (value: string) => void,
    onSortChange?: (value: string) => void
}

export default function SearchBar({ search, sortField, onSearchChange, onSortChange } : SearchBarProps) {
    return (
        <div className="search-bar">
            <div className="search-box-container inner-shadow">
                <img src={magnifyingGlass} className="magnifying-glass" alt="magnifying-glass"/>
                <input type="text" className="search-box inner-shadow" placeholder="Search" value={search} id='searchInput'
                       onChange={(e) => onSearchChange?.(e.target.value)}/>
            </div>
            <button className="sort-button inner-shadow">A</button>

            {/*<select name="orderBy" id="orderBy" onChange={e => onSortChange?.(e.target.value)}
                    defaultValue={sortField}>
                {['id', 'name'].map(sortFieldOption => <option key={sortFieldOption} value={sortFieldOption}>
                    {sortFieldOption}
                </option>)}
            </select>*/}
        </div>
    )
}