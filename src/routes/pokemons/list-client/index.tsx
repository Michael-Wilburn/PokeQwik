import { component$, useStore, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from "@builder.io/qwik-city";
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

interface PokemonPageState {
    currentPage: number;
    pokemons: SmallPokemon[];
}

export default component$(() => {

    const pokemonState = useStore<PokemonPageState>({
        currentPage: 0,
        pokemons: [],
    })

    // useVisibleTask$(async ({ track }) => {
    //     track(() => pokemonState.currentPage);
    //     const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
    //     pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons]
    // })
    useTask$(async ({ track }) => {
        track(() => pokemonState.currentPage);
        const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
        pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons]
    })


    return (
        <>
            <div class="flex flex-col">
                <span class="my-5 text-5xl">Status</span>
                <span>Página actual: {pokemonState.currentPage} </span>
                <span>Está cargando: </span>
            </div>
            <div class="mt-10">
                {/* <button class="btn btn-primary mr-2" onClick$={() => { pokemonState.currentPage-- }}>Anteriores</button> */}
                <button class="btn btn-primary mr-2" onClick$={() => { pokemonState.currentPage++ }}>Siguientes</button>
            </div>
            <div class="grid grid-cols-6 mt-5">
                {pokemonState.pokemons.map(({ name, id }) => (
                    <div key={name} class="m-5 flex flex-col justify-center items-center">
                        <PokemonImage pokemonID={id} />
                        <span class="capitalize">{name}</span>
                    </div>
                ))}
            </div>
        </>
    )
});

export const head: DocumentHead = {
    title: "List Client"
};