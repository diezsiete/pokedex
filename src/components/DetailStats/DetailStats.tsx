import type { Pokemon } from "@api/types.ts";
import { formatStatBase, shortenStatName} from "@util/format.ts";
import './DetailStats.css'

/**
 * Estadísticas base de un pókemon
 */
export default function DetailStats({ pokemon }: { pokemon: Pokemon }) {
    const mainType = pokemon.types[0].type.name;

    return (
        <div className="detail-stats">
            <h3 className={`detail-stats-title ${mainType}-color`}>Base Stats</h3>
            {pokemon.stats.map(stat => (
                <div className="row" key={stat.id}>
                    <span className={`name ${mainType}-color`}>{shortenStatName(stat.stat.name)}</span>
                    <span className="base">{formatStatBase(stat.base)}</span>
                    <div className="bar">
                        <div className={`bar-fill ${mainType}`}
                            style={{
                                // Progress bar es de 0 a 200 debemos calcular el progress con CSS custom property
                                ["--value" as never]: stat.base,
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}