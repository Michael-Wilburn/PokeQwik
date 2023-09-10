import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { Navbar } from "~/components/shared/navbar/navbar";
import { PokemonProvider } from "~/context/pokemon/pokemon-provider";
// import { PokemonGameContext, type PokemonGameState } from "~/context";
// import { PokemonListContext, type PokemonListState } from "~/context/pokemon/pokemon-list.context";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {

  // const pokemonGame = useStore<PokemonGameState>({
  //   pokemonID: 4,
  //   isPokemonVisible: false,
  //   showBackImage: false
  // });
  // useContextProvider(PokemonGameContext, pokemonGame);

  // const pokemonList = useStore<PokemonListState>({
  //   currentPage: 1,
  //   isLoading: false,
  //   pokemons: [],
  // })
  // useContextProvider(PokemonListContext, pokemonList)

  return (
    <PokemonProvider>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </PokemonProvider>
  )
});
