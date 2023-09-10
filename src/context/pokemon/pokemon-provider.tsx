import { component$, Slot, useStore, useContextProvider } from "@builder.io/qwik";
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

    return (<Slot />)
});