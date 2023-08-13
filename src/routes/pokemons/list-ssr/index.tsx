import { component$ } from '@builder.io/qwik';
import { type DocumentHead, Link, routeLoader$ } from "@builder.io/qwik-city";
import axios from 'axios';


export const usepokemonList = routeLoader$(async () => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`);
    const data = res.data.results;
    return data
})

export default component$(() => {
    const pokemonResp = usepokemonList()

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
                {/* {
                    pokemonResp.value.map((pokemon: any) => {
                        <div class="flex flex-col m-5 justify-center items-center">{pokemon.name}</div>
                    })
                } */}
                {JSON.stringify(pokemonResp.value)}

            </div>
        </>
    )
})


export const head: DocumentHead = {
    title: "SSR List",
};