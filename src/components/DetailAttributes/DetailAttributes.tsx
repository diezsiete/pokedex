import type { Pokemon } from "@api/types.ts";
import { formatPokemonMetric } from "@util/format.ts";
import './DetailAttributes.css'

/**
 * Atributos de un pókemon: generación, peso, altura habilidades ....
 */
export default function DetailAttributes({ pokemon }: { pokemon: Pokemon }) {
    return <>
        <div className="detail-attributes values">
            <div>{pokemon.specy.generation.id}</div>
            <div>{formatPokemonMetric(pokemon.weight)} kg</div>
            <div>{formatPokemonMetric(pokemon.height)} m</div>
            <div>
                {pokemon.abilities.map((ability, key) => (
                    <span key={key}>{ability.ability.name}</span>
                ))}
            </div>
        </div>
        <div className="detail-attributes labels">
            <div>Generation</div>
            <div>Weight</div>
            <div>Height</div>
            <div>Abilities</div>
        </div>
    </>
}