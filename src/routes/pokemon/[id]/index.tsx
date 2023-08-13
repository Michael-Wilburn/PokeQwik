import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {

    const id = Number(params.id);
    if (isNaN(id) || id <= 0 || id > 1010) throw redirect(301, '/')
    return id
})

export default component$(() => {

    const pokemonID = usePokemonId();

    return (
        <>
            <span class="text-5xl">
                Pokemon: {pokemonID.value}
            </span>
            <PokemonImage
                pokemonID={pokemonID.value}
            />
        </>
    )
});