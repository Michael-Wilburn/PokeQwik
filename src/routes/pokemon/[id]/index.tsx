import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from "~/context";

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {

    const id = Number(params.id);
    if (isNaN(id) || id <= 0 || id > 1010) throw redirect(301, '/')
    return id
})

export default component$(() => {

    const pokemonID = usePokemonId();
    const pokemonGame = useContext(PokemonGameContext);

    return (
        <>
            <span class="text-5xl">
                Pokemon: {pokemonID.value}
            </span>
            <PokemonImage
                pokemonID={pokemonID.value}
                isVisible={pokemonGame.isPokemonVisible}
                isBack={pokemonGame.showBackImage}
                size={150}

            />
        </>
    )
});