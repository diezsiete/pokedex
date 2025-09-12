export const formatPokemonName = (name: string) => ucfirst(name).replace('-', ' ')

export const formatPokemonId = (id: number) => '#' + String(id).padStart(3, '0');

export const formatPokemonMetric = (height: number) => height / 10;

export const shortenStatName = (name: string) => match(name, {
    attack: 'ATK',
    defense: 'DEF',
    'special-attack': 'SATK',
    'special-defense': 'SDEF',
    speed: 'SPD'
}, name);

export const formatStatBase = (base: number) => String(base).padStart(3, '0');

/**
 * Uppercase first letter of string
 */
export const ucfirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const match = <T extends string | number, R>(value: T, cases: Record<T, R>, defaultValue?: R): R =>
    Object.prototype.hasOwnProperty.call(cases, value) ? cases[value] : (defaultValue as R);