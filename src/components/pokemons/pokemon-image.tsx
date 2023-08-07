import { component$ } from '@builder.io/qwik';

interface Props {
    pokemonID: number,
    size?: number,
    isBack: boolean
}
export const PokemonImage = component$(({ pokemonID, size = 200, isBack = false }: Props) => {
    return (
        <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${isBack ? '/back/' : ''}${pokemonID}.png`}
            alt="Pokemon Sprite"
            width={`${size}`}
            height={`${size}`}
        />
    )
});