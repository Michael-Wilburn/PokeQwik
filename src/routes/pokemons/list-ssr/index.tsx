import { component$, useComputed$, $, useSignal } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$, useLocation, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { Modal } from '~/components/shared';
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

    const modalVisible = useSignal(false);

    const currentOffset = useComputed$<number>(() => {
        // const offsetString = location.url.searchParams.get('offset');
        const offsetString = new URLSearchParams(location.url.search)
        return Number(offsetString.get('offset') || '0');
    })

    //Modal Functions
    const showModal = $((id: string, name: string) => {
        console.log({ id, name });
        modalVisible.value = true;

    })

    const closeModal = $(() => {
        modalVisible.value = false;
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
                    <div key={name}
                        onClick$={() => showModal(id, name)}
                        class="m-5 flex flex-wrap flex-col justify-center items-center">
                        <PokemonImage pokemonID={id} />
                        <span class="capitalize">{name}</span>
                    </div>
                ))}
            </div>
            <Modal showModal={modalVisible.value} closeFn={closeModal}>
                <div q:slot='title'>Nombre del Pokemon</div>
                <div class="flex flex-col justify-center items-center" q:slot='content'>
                    <PokemonImage q:slot='content' pokemonID={1} />
                    <span>Preguntandole a ChatGPT</span>
                </div>
            </Modal>
        </>
    )
})


export const head: DocumentHead = {
    title: "SSR List",
};