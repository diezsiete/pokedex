import { useCallback, useState } from "react";
import { useLazyQuery } from "@apollo/client/react";
import LIST_TYPES from "@api/ListTypes.ts";
import CustomSelect from "@components/CustomSelect/CustomSelect";
import { ucfirst } from "@util/format.ts";
import './TypeFilter.css'

/**
 * Para filtrar pokemones por su tipo.
 * Realiza la consulta a api de los tipos solo cuando se abre por primera vez.
 */
export default function TypeFilter({ value, onChange }: {value: string, onChange?: (value: string) => void}) {
    const [options, setOptions] = useState<Record<string, string>|null>(null)
    const [listTypes] = useLazyQuery(LIST_TYPES);

    const handleShown = useCallback(() => {
        if (!options) {
            listTypes().then(({ data }) => {
                const types: Record<string, string> = (data?.types ?? []).reduce((opts: Record<string, string>, type) => {
                    opts[type.type.name] = ucfirst(type.type.name);
                    return opts;
                }, {'all': 'All'});
                setOptions(types);
            })
        }
    }, [options, listTypes]);

    const handleChange = (value: string) => {
        onChange?.(value === 'all' ? '' : value);
    }


    return <CustomSelect options={options || {}} value={value || 'all'} onChange={handleChange} onShown={handleShown} legend='Type:'>
        T
    </CustomSelect>
}