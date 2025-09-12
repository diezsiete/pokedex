import { Link, useParams } from "react-router";
import { useQuery } from "@apollo/client/react";
import GET_POKEMON from "@api/GetPokemon.ts";
import DetailAttributes from "@components/DetailAttributes/DetailAttributes.tsx";
import DetailStats from "@components/DetailStats/DetailStats.tsx";
import { formatPokemonId, formatPokemonName } from "@util/format.ts";
import pokeball from '@assets/pokeball.svg'
import './DetailPage.css'

/**
 * Pagina detalle de un pókemon
 * El pókemon se obtiene por el nombre en la url
 */
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
                <img className='pokemon-image' src={pokemon.sprites[0].src} alt="pokemon-img"/>
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

                    <DetailAttributes pokemon={pokemon} />

                    <p className="description">
                        {pokemon.specy.description[0].text}
                    </p>
                </div>

                <DetailStats pokemon={pokemon} />
            </div>
        </main>
    </div>
}