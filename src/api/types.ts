export type Pokemon = {
    id: number;
    name: string;
    height: number;
    weight: number,
    abilities: Ability[]
    sprites: Sprites[];
    specy: Specy
    stats: Stat[]
    types: Type[];
};

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
    }[]
}

type Sprites = {
    sprites: {
        other: {
            'official-artwork': {
                'front_default': string
            }
        }
    }
}

type Stat = {
    id: number,
    base: number,
    stat: {
        name: string
    }
}

type Type = {
    type: { name: string };
}