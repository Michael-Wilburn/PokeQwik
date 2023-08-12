import { component$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {
  const pokemonID = useSignal(1);
  const showBackImage = useSignal(false)
  const isPokemonVisible = useSignal(false)

  const changePokemonId = $((value: number) => {
    if (pokemonID.value + value <= 0) { return }
    pokemonID.value += value

  })

  return (
    <>
      <span class="text-2xl">Buscadr simple</span>
      <span class="text-9xl">{pokemonID.value}</span>
      <PokemonImage pokemonID={pokemonID.value} size={200} isBack={showBackImage.value} isVisible={isPokemonVisible.value} />

      <div class="mt-2">
        <button onClick$={() => changePokemonId(-1)} class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => showBackImage.value = !showBackImage.value} class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={() => changePokemonId(+1)} class="btn btn-primary">Siguiente</button>
        <button onClick$={() => isPokemonVisible.value = !isPokemonVisible.value} class="btn btn-primary ml-2">Revelar</button>
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
