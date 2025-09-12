import { type ReactNode, useEffect, useState } from "react";
import classNames from "classnames";
import './CustomSelect.css'

type CustomSelectProps = {
    options: Record<string, string>,
    value: string,
    legend: string,
    onChange?: (value: string) => void,
    onShown?: () => void,
    className?: string
};

export default function CustomSelect({ options, value, legend, onChange, onShown, className, children }: CustomSelectProps & { children: ReactNode }) {
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (showDropdown && onShown) {
            onShown();
        }
    }, [showDropdown, onShown]);

    const handleChange = (fieldOption: string) => {
        setShowDropdown(false);
        onChange?.(fieldOption);
    }

    return <>
        <div className={classNames('custom-select', className)}>
            <button className="trigger-button inner-shadow primary-color" onClick={() => setShowDropdown(!showDropdown)}>
                {children}
            </button>

            <Dropdown options={options} show={showDropdown} value={value} legend={legend} onChange={handleChange}/>
        </div>
        <div className={classNames('custom-select-open-overlay', {shown: showDropdown})} onClick={() => setShowDropdown(false)} />
    </>
    
}

type DropdownProps = { show: boolean } & CustomSelectProps
function Dropdown({ show, options, value, legend, onChange }: DropdownProps) {

    return <div className={classNames('custom-select-dropdown primary', {shown: show})}>
        <p className='legend'>{legend}</p>
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