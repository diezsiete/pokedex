import { Link, useParams } from "react-router";
import { useQuery } from "@apollo/client/react";
import GET_POKEMON from "@api/GetPokemon.ts";
import { formatPokemonId, formatPokemonMetric, formatPokemonName } from "@util/format.ts";
import pokeball from '@assets/pokeball.svg'
import './DetailPage.css'

export default function DetailPage() {
    const params = useParams();
    const {loading, error, data} = useQuery(GET_POKEMON, {
        variables: { name: params.name as string },
    });
    if (loading) return <p>Loading...</p>;
    if (error || !data) return <p>Error :(</p>;

    const pokemon = data.pokemons[0];
    if (!pokemon) return <p>404 not found</p>;

    const mainType = pokemon.types[0].type.name;


    return <div className={`main-container detail-page ${mainType}`}>
        <header className='detail-page-header'>
            <img src={pokeball} alt="Pokeball logo" className='pokeball-back'/>
            <div className="title">
                <Link to='/'>
                    <span className="back-arrow">←</span>
                    <span className="pokemon-name">{formatPokemonName(pokemon.name)}</span>
                </Link>
                <span className="pokemon-number">{formatPokemonId(pokemon.id)}</span>
            </div>

            <div className="pokemon-image-container">
                <img className='pokemon-image'
                     src={pokemon.sprites[0].sprites.other['official-artwork']['front_default']} alt="pokemon-img"/>
                {/*<div className="nav-arrow right">›</div>*/}
            </div>
        </header>
        <main className='detail-page-main inner-shadow'>
            <div className="content">
                <div className="type-badges">
                    {pokemon.types.map((t, k) =>
                        <span key={k} className={`type-badge ${t.type.name}`}>{t.type.name}</span>
                    )}
                </div>

                <div className="about-section">
                    <h3 className={`about-title ${mainType}-color`}>About</h3>

                    <div className="info-row">
                        <div className="info-item">
                            <div className="info-value">{formatPokemonMetric(pokemon.weight)} kg</div>
                            <div className="info-label">Weight</div>
                        </div>
                        <div className="divider"></div>
                        <div className="info-item">
                            <div className="info-value">{formatPokemonMetric(pokemon.height)} m</div>
                            <div className="info-label">Height</div>
                        </div>
                        <div className="divider"></div>
                        <div className="info-item">
                            <div className="info-value">{pokemon.abilities.map((ability, key) => (
                                <span key={key}>{ability.ability.name}</span>
                            ))}</div>
                            <div className="info-label">Moves</div>
                        </div>
                    </div>

                    <p className="description">
                        {pokemon.specy.description[0].text}
                    </p>
                </div>

                <div className="base-stats">
                    <h3 className={`base-stats-title ${mainType}-color`}>Base Stats</h3>
                    {pokemon.stats.map(stat => (
                        <div className="stat-row" key={stat.id}>
                            <span className={`stat-name ${mainType}-color`}>{stat.stat.name}</span>
                            <span className="stat-base">{stat.base}</span>
                            <div className="stat-bar">
                                {/*<div className={`stat-fill ${mainType}`} style={{width: stat.base}}></div>*/}

                                <div
                                    className={`stat-fill ${mainType}`}
                                    style={{
                                        // Pass the value to a CSS custom property
                                        ["--value" as never]: stat.base,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    </div>
}