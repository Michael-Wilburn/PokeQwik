import { component$, useSignal, useTask$ } from '@builder.io/qwik';

interface Props {
    pokemonID: number,
    size?: number,
    isBack: boolean
}
export const PokemonImage = component$(({ pokemonID, size = 96, isBack = false }: Props) => {
    const imageLoaded = useSignal(false)

    useTask$(({ track }) => {
        track(() => pokemonID)
        track(() => isBack)
        imageLoaded.value = !imageLoaded.value;
    })

    return (
        <div class="flex justify-center items-center" style={{ width: `${size}px`, height: `${size}px` }}>
            {!imageLoaded.value && <span>Cargando...</span>}
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${isBack ? '/back/' : ''}${pokemonID}.png`}
                alt="Pokemon Sprite"
                width={`${size}`}
                height={`${size}`}
                onLoad$={() => imageLoaded.value = true}
                class={!imageLoaded.value && "hidden"}
            />
        </div>
    )
});