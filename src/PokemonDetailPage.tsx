import { useParams } from "react-router";
import {useQuery} from "@apollo/client/react";
import GET_POKEMON from "./api/GET_POKEMON.ts";

export default function PokemonDetailPage() {
    const params = useParams();
    const {loading, error, data} = useQuery(GET_POKEMON, {
        variables: { name: params.name as string },
    });
    if (loading) return <p>Loading...</p>;
    if (error || !data) return <p>Error :(</p>;

    const p = data.pokemons[0];
    if (!p) return <p>404 not found</p>;


    return <>
        <h3>{p.id + ' ' + p.name} —{" #"} {String(p.id).padStart(3, '0')} —{" "}</h3>
        <p>{p.pokemontypes.map((t) => t.type.name).join(", ")}</p>
        <img src={p.pokemonsprites[0].sprites.other['official-artwork']['front_default']} alt=""/>
    </>
}