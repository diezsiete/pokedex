import CustomSelect from "@components/CustomSelect/CustomSelect.tsx";
import './SortField.css';

type SortFieldProps = { sortField: string, onSortFieldChange?: (sortField: string) => void};

/**
 * Permite seleccionar ordenamiento en la grilla de pokemones
 */
export default function SortField({ sortField, onSortFieldChange }: SortFieldProps) {
    const options = {'id': 'Number', 'name': 'Name'};

    return <CustomSelect options={options} value={sortField} onChange={onSortFieldChange} legend='Sort by:' className='sort-field'>
        {sortField === 'name' ? 'A' : '#'}
    </CustomSelect>
}