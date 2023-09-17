import { component$, $ } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonGame } from "~/hooks/use-pokemon-game";

export default component$(() => {

  const {
    pokemonId,
    showBackImage,
    isPokemonVisible,
    nextPokemon,
    prevPokemon,
    toggleFromBack,
    toggleVisible,
  } = usePokemonGame()

  const nav = useNavigate();

  const goToPokemon = $((id: number) => {
    nav(`/pokemon/${id}/`)
  })

  return (
    <>
      <span class="text-2xl">Buscadr simple</span>
      <span class="text-9xl">{pokemonId.value}</span>
      {/* <Link href={`/pokemon/${pokemonID.value}/`}>
      </Link> */}
      <div onClick$={() => goToPokemon(pokemonId.value)}>
        <PokemonImage pokemonID={pokemonId.value} size={200} isBack={showBackImage.value} isVisible={isPokemonVisible.value} />
      </div>

      <div class="mt-2">
        <button onClick$={prevPokemon} class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={toggleFromBack} class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={nextPokemon} class="btn btn-primary">Siguiente</button>
        <button onClick$={toggleVisible} class="btn btn-primary ml-2">Revelar</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Pokemon App",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
