import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

import { usePokemonGame } from '~/hooks/use-pokemon-game';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {

    const id = Number(params.id);
    if (isNaN(id) || id <= 0 || id > 1010) throw redirect(301, '/')
    return id
})

export default component$(() => {

    const {
        pokemonId,
        isPokemonVisible,
        showBackImage,
        toggleFromBack,
        toggleVisible,
    } = usePokemonGame()

    return (
        <>
            <span class="text-5xl">
                Pokemon: {pokemonId.value}
            </span>
            <PokemonImage
                pokemonID={pokemonId.value}
                isVisible={isPokemonVisible.value}
                isBack={showBackImage.value}
                size={150}
            />
            <div class="flex">
                <button onClick$={toggleVisible} class="btn btn-primary mr-2">Revelar</button>
                <button onClick$={toggleFromBack} class="btn btn-primary ml-2">Voltear</button>
            </div>
        </>
    )
});