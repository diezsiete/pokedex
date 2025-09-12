import pokeball from "@assets/pokeball.svg";
import FavoriteButton from "@components/FavoriteButton/FavoriteButton.tsx";
import SearchBar from "@components/SearchBar/SearchBar.tsx";
import TypeFilter from "@components/TypeFilter/TypeFilter.tsx";
import SortField from "@components/SortField/SortField.tsx";
import './GridPageHeader.css';

type GridPageHeaderProps = {
    inFavorites: boolean,
    onInFavoritesChange: (inFavorites: boolean) => void,
    onSearch: (query: string) => void,
    sortField: string,
    onSortFieldChange?: (field: string) => void,
    typeFilter: string
    onTypeFilterChange?: (typeFilter: string) => void
};

/**
 * Encabezado para Grid de pokemones
 */
export default function GridPageHeader({
    inFavorites, onInFavoritesChange, onSearch, sortField, onSortFieldChange, typeFilter, onTypeFilterChange
}: GridPageHeaderProps) {
    return (
        <header className="grid-page-header">
            <div className="title">
                <div className='brand'>
                    <img src={pokeball} alt="Pokeball logo"/>
                    <h1>Pokédex</h1>
                </div>
                <FavoriteButton active={inFavorites} onClick={() => onInFavoritesChange(!inFavorites)}/>
            </div>
            <div className="filters">
                <SearchBar onSearch={onSearch}/>
                <TypeFilter value={typeFilter} onChange={onTypeFilterChange} />
                <SortField sortField={sortField} onSortFieldChange={onSortFieldChange} />
            </div>
        </header>
    )
}