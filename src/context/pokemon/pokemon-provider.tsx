import { component$, Slot, useStore, useContextProvider, useVisibleTask$ } from "@builder.io/qwik";
import { type PokemonGameState, PokemonGameContext } from "./pokemon-game.context";
import { type PokemonListState, PokemonListContext } from "./pokemon-list.context";


export const PokemonProvider = component$(() => {
    const pokemonGame = useStore<PokemonGameState>({
        pokemonID: 4,
        isPokemonVisible: false,
        showBackImage: false
    });
    useContextProvider(PokemonGameContext, pokemonGame);

    const pokemonList = useStore<PokemonListState>({
        currentPage: 1,
        isLoading: false,
        pokemons: [],
    })
    useContextProvider(PokemonListContext, pokemonList)

    useVisibleTask$(() => {
        // TODO: leerr del local storage
        if (localStorage.getItem('pokemon-game')) {
            const {
                isPokemonVisible = true,
                pokemonID = 10,
                showBackImage = false } = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState

            pokemonGame.isPokemonVisible = isPokemonVisible,
                pokemonGame.pokemonID = pokemonID,
                pokemonGame.showBackImage = showBackImage

        }


    })
    useVisibleTask$(({ track }) => {
        track(() => [pokemonGame.isPokemonVisible, pokemonGame.pokemonID, pokemonGame.showBackImage])
        localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
    })



    return (<Slot />)
});