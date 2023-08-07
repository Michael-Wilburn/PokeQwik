import { component$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const pokemonID = useSignal(1);

  const changePokemonId = $((value: number) => {
    if (pokemonID.value + value <= 0) { return }

    pokemonID.value += value

  })


  return (
    <>
      <span class="text-2xl">Buscadr simple</span>
      <span class="text-9xl">{pokemonID.value}</span>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID.value}.png`}
        alt="Pokemon Sprite"
        width={200}
        height={200}
      />
      <div class="mt-2">
        <button onClick$={() => changePokemonId(-1)} class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => changePokemonId(+1)} class="btn btn-primary">Siguiente</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
