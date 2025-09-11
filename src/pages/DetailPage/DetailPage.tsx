import { useParams } from "react-router";
import { useQuery } from "@apollo/client/react";
import GetPokemon from "../../api/GetPokemon.ts";

export default function DetailPage() {
    const params = useParams();
    const {loading, error, data} = useQuery(GetPokemon, {
        variables: { name: params.name as string },
    });
    if (loading) return <p>Loading...</p>;
    if (error || !data) return <p>Error :(</p>;

    const pokemon = data.pokemons[0];
    if (!pokemon) return <p>404 not found</p>;


    return <>
        <h3>{pokemon.id + ' ' + pokemon.name} —{" #"} {String(pokemon.id).padStart(3, '0')} —{" "}</h3>
        <img src={pokemon.sprites[0].sprites.other['official-artwork']['front_default']} alt=""/>
        <h2>About</h2>
        <p>{pokemon.types.map((t) => t.type.name).join(", ")}</p>
        <div>
            <div>
                {pokemon.weight}
            </div>
            <div>
                {pokemon.height}
            </div>
            <div>
                <ul>
                    {pokemon.abilities.map((ability, key) => (
                        <li key={key}>{ability.ability.name}</li>
                    ))}
                </ul>
            </div>
        </div>
        <p>
            {pokemon.specy.description[0].text}
        </p>
        <h2>Base stats</h2>
        <div>
            <ul>
                {pokemon.stats.map(stat => (
                    <li key={stat.id}><strong>{stat.stat.name}</strong> {stat.base}</li>
                ))}
            </ul>
        </div>
    </>
}