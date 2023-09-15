import { component$, $, useContext } from "@builder.io/qwik";
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";

export default component$(() => {
  // const pokemonID = useSignal(1);
  // const showBackImage = useSignal(false)
  // const isPokemonVisible = useSignal(false)

  const pokemonGame = useContext(PokemonGameContext);


  const nav = useNavigate();

  // const changePokemonId = $((value: number) => {
  //   if (pokemonGame.pokemonID + value <= 0) { return }
  //   pokemonGame.pokemonID += value

  // })

  const goToPokemon = $(() => {
    nav(`/pokemon/${pokemonGame.pokemonID}/`)
  })

  return (
    <>
      <span class="text-2xl">Buscadr simple</span>
      <span class="text-9xl">{pokemonGame.pokemonID}</span>
      {/* <Link href={`/pokemon/${pokemonID.value}/`}>
      </Link> */}
      <div onClick$={goToPokemon}>
        <PokemonImage pokemonID={pokemonGame.pokemonID} size={200} isBack={pokemonGame.showBackImage} isVisible={pokemonGame.isPokemonVisible} />
      </div>

      <div class="mt-2">
        <button onClick$={() => changePokemonId(-1)} class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => pokemonGame.showBackImage = !pokemonGame.showBackImage} class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={() => changePokemonId(+1)} class="btn btn-primary">Siguiente</button>
        <button onClick$={() => pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible} class="btn btn-primary ml-2">Revelar</button>
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
