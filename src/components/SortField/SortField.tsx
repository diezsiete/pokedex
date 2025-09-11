import { useState } from "react";
import classNames from "classnames";
import './SortField.css';

type SortFilterProps = { field: string, onChange?: (field: string) => void };

export default function SortField({ field, onChange }: SortFilterProps) {
    const [showCard, setShowCard] = useState(false);

    const handleChange = (fieldOption: string) => {
        setShowCard(false);
        onChange?.(fieldOption);
    }

    return <>
        <div className='sort-field'>
            <button className="trigger-button inner-shadow primary-color" onClick={() => setShowCard(!showCard)}>
                {field === 'name' ? 'A' : '#'}
            </button>

            <SortCard show={showCard} field={field} onChange={handleChange}/>
        </div>
        <div className={classNames('sort-field-open-overlay', {shown: showCard})} onClick={() => setShowCard(false)} />
    </>
}

function SortCard({show, field, onChange}: { show: boolean } & SortFilterProps) {

    const options = {'id': 'Number', 'name': 'Name'}

    return <div className={classNames('sort-card primary', {shown: show})}>
        <p className='legend'>Sort by:</p>
        <div className="radio-group inner-shadow">
            {Object.keys(options).map((fieldOption) =>
                <label key={fieldOption}>
                    <input type="radio" name="sortField" checked={field === fieldOption} value={fieldOption}
                           onChange={() => onChange?.(fieldOption)}
                    /> {options[fieldOption as keyof typeof options]}
                </label>
            )}
        </div>
    </div>
}