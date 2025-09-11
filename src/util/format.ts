export const formatPokemonName = (name: string) => ucfirst(name).replace('-', ' ')

export const formatPokemonId = (id: number) => '#' + String(id).padStart(3, '0')

export const ucfirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);