import { component$, useComputed$, $ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$, useLocation, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';


export const usepokemonList = routeLoader$<SmallPokemon[]>(async ({ pathname, query, redirect }) => {
    const offset = Number(query.get('offset') || 0);
    if (isNaN(offset) || offset < 0) throw redirect(301, pathname)

    const pokemons = await getSmallPokemons(offset)
    return pokemons
})

export default component$(() => {
    const pokemons = usepokemonList()
    const location = useLocation()
    const nav = useNavigate()

    const currentOffset = useComputed$<number>(() => {
        // const offsetString = location.url.searchParams.get('offset');
        const offsetString = new URLSearchParams(location.url.search)
        return Number(offsetString.get('offset') || '0');
    })


    const onClickNav = $((value: number) => {
        if (currentOffset.value + value < 0) return;
        nav(`/pokemons/list-ssr/?offset=${currentOffset.value + value}`)
    })

    return (
        <>
            <div class="flex flex-col">
                <span class="my-5 text-5xl">Status</span>
                <span>Offset: {currentOffset} </span>
                <span>Esta cargando pagina: {location.isNavigating ? 'Cargando ... ' : 'Cargado'}</span>
            </div>
            <div class="mt-10">
                <button class="btn btn-primary mr-2" onClick$={() => { onClickNav(-10) }}>Anteriores</button>
                <button class="btn btn-primary mr-2" onClick$={() => { onClickNav(10) }}>Siguientes</button>
            </div>
            <div class="flex flex-wrap justify-center items-center mt-5">
                {pokemons.value.map(({ name, id }) => (
                    <div key={name} class="m-5 flex flex-wrap flex-col justify-center items-center">
                        <PokemonImage pokemonID={id} />
                        <span class="capitalize">{name}</span>
                    </div>
                ))}
            </div>
        </>
    )
})


export const head: DocumentHead = {
    title: "SSR List",
};