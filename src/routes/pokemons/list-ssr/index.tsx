import { component$ } from '@builder.io/qwik';
import { type DocumentHead, Link, routeLoader$ } from "@builder.io/qwik-city";
import axios from 'axios';
import type { BasicPokemonInfo, PokemonListResponse } from '~/interfaces';


export const usepokemonList = routeLoader$<BasicPokemonInfo[]>(async () => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`);
    const data = res.data as PokemonListResponse
    return data.results
})

export default component$(() => {
    const pokemons = usepokemonList()

    return (
        <>
            <div class="flex flex-col">
                <span class="my-5 text-5xl">Status</span>
                <span>Pagina Actual: </span>
                <span>Esta cargando pagina: </span>

            </div>
            <div class="mt-10">
                <Link class="btn btn-primary mr-2">Anteriores</Link>
                <Link class="btn btn-primary mr-2">Siguientes</Link>
            </div>
            <div class="grid grid-cols-6 mt-5">
                {pokemons.value.map(pokemon => (
                    <div key={pokemon.name} class="m-5 flex flex-col justify-center items-center">
                        <span class="capitalize">{pokemon.name}</span>
                    </div>

                ))}
            </div>
        </>
    )
})


export const head: DocumentHead = {
    title: "SSR List",
};