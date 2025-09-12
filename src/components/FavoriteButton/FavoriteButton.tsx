import type { MouseEvent } from "react";
import classNames from "classnames";
import './FavoriteButton.css';

/**
 * Boton para agregar o ver favoritos
 */
export default function FavoriteButton({ active, onClick }: { active?: boolean, onClick?: (e: MouseEvent) => void } ) {
    return (
        <button className={classNames('favorite-button', { active })} onClick={e => onClick?.(e)}>
            <StarIcon/>
        </button>
    )
}

const StarIcon = ({
    size = 32,
    strokeColor = "gold",
    fillColor = "currentColor",
}: {size?: number, strokeColor?: string, fillColor?: string}) =>
    <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size} height={size}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        className='star'
        strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
</svg>