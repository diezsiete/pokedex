import pokeball from "@assets/pokeball.svg";
import FavoriteButton from "@components/FavoriteButton/FavoriteButton.tsx";
import SearchBar from "@components/SearchBar/SearchBar.tsx";
import CustomSelect from "@components/CustomSelect/CustomSelect.tsx";
import './GridPageHeader.css';

type GridPageHeaderProps = {
    inFavorites: boolean,
    onInFavoritesChange: (inFavorites: boolean) => void,
    onSearch: (query: string) => void,
    sortField: string,
    onSortFieldChange?: (field: string) => void
};
export default function GridPageHeader({
    inFavorites, onInFavoritesChange, onSearch, sortField, onSortFieldChange
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
                <CustomSelect options={{'id': 'Number', 'name': 'Name'}} value={sortField} onChange={onSortFieldChange}>
                    {sortField === 'name' ? 'A' : '#'}
                </CustomSelect>
            </div>
        </header>
    )
}