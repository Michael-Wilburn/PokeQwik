import { component$, useComputed$, useSignal, useTask$ } from '@builder.io/qwik';

interface Props {
    pokemonID: number | string,
    size?: number,
    isBack?: boolean
    isVisible?: boolean
}
export const PokemonImage = component$(({ pokemonID, size = 96, isBack = false, isVisible = false }: Props) => {
    const imageLoaded = useSignal(false)

    useTask$(({ track }) => {
        track(() => pokemonID)
        track(() => isBack)
        imageLoaded.value = !imageLoaded.value;
    })

    const imageUrl = useComputed$(() => {
        if (pokemonID === '') return '';
        return ((isBack) ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonID}.png` :
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`)
    })

    return (
        <div class="flex justify-center items-center" style={{ width: `${size}px`, height: `${size}px` }}>
            {!imageLoaded.value && <span>Cargando...</span>}
            <img
                // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${isBack ? '/back/' : ''}${pokemonID}.png`}
                src={imageUrl.value}
                alt="Pokemon Sprite"
                width={`${size}`}
                height={`${size}`}
                onLoad$={() => imageLoaded.value = true}
                class={[{
                    "hidden": !imageLoaded.value,
                    "brightness-0": isVisible
                }, 'transition-all', "cursor-pointer"]}
            />
        </div>
    )
});