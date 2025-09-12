import {type ReactNode, useState} from "react";
import classNames from "classnames";
import './CustomSelect.css'

type CustomSelectProps = { options: Record<string, string>, value: string, onChange?: (value: string) => void };

export default function CustomSelect({ options, value, onChange, children }: CustomSelectProps & { children: ReactNode }) {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleChange = (fieldOption: string) => {
        setShowDropdown(false);
        onChange?.(fieldOption);
    }

    return <>
        <div className='custom-select'>
            <button className="trigger-button inner-shadow primary-color" onClick={() => setShowDropdown(!showDropdown)}>
                {children}
            </button>

            <Dropdown options={options} show={showDropdown} value={value} onChange={handleChange}/>
        </div>
        <div className={classNames('custom-select-open-overlay', {shown: showDropdown})} onClick={() => setShowDropdown(false)} />
    </>
    
}

type DropdownProps = { show: boolean } & CustomSelectProps
function Dropdown({ show, options, value, onChange }: DropdownProps) {

    return <div className={classNames('custom-select-dropdown primary', {shown: show})}>
        <p className='legend'>Sort by:</p>
        <div className="radio-group inner-shadow">
            {Object.keys(options).map((fieldOption) =>
                <label key={fieldOption}>
                    <input type="radio" name="sortField" checked={value === fieldOption} value={fieldOption}
                           onChange={() => onChange?.(fieldOption)}
                    /> {options[fieldOption as keyof typeof options]}
                </label>
            )}
        </div>
    </div>
}