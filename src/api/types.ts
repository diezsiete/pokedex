export type Pokemon = {
    id: number;
    name: string;
    height: number;
    weight: number,
    abilities: Ability[]
    sprites: { 'src': string }[];
    specy: Specy
    stats: Stat[]
    types: Type[];
};

export type PokemonCard = Pick<Pokemon, 'id'|'name'|'sprites'>

type Ability = {
    ability: {
        name: string;
    }
}

type Specy = {
    color: {
        name: string
    }
    description: {
        text: string
    }[];
    generation: {
        id: number
    }
}

type Stat = {
    id: number,
    base: number,
    stat: {
        name: string
    }
}

export type Type = {
    type: { name: string };
}