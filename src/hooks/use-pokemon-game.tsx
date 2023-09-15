import { useContext, useComputed$, $ } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context";

export const usePokemonGame = () => {
    const pokemonGame = useContext(PokemonGameContext);

    const changePokemonId = $((value: number) => {
        if (pokemonGame.pokemonID + value <= 0) { return }
        pokemonGame.pokemonID += value

    })

    const toggleFromBack = $(() => {
        pokemonGame.showBackImage = !pokemonGame.showBackImage
    })

    const toggleVisible = $(() => {
        pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible
    })


    return {
        pokemonId: useComputed$(() => pokemonGame.pokemonID),
        showBackImage: useComputed$(() => pokemonGame.showBackImage),
        isPokemonVisible: useComputed$(() => pokemonGame.isPokemonVisible),
        nextPokemon: () => changePokemonId(+1),
        prevPokemon: () => changePokemonId(-1),
        toggleFromBack: toggleFromBack,
        toggleVisible: toggleVisible,

    }
}