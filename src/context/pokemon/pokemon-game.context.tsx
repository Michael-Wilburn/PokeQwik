import { createContextId } from "@builder.io/qwik";

export interface PokemonGameState {
    pokemonID: number;
    showBackImage: boolean;
    isPokemonVisible: boolean
}

export const PokemonGameContext = createContextId<PokemonGameState>('pokemon.game-context');
