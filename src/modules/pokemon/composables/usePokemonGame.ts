import { computed, onMounted, ref } from "vue"
import { GameStatus, type Pokemon, type PokemonListResponse } from "../interfaces";
import { pokemonApi } from "../api/pokemonApi";
import confetti from "canvas-confetti";

export const usePokemonGame = () => {

    const gameStatus = ref<GameStatus>(GameStatus.Playing);
    const pokemons = ref<Pokemon[]>([]);
    const pokemonsOptions = ref<Pokemon[]>([]);

    const randomPokemon = computed(() => pokemonsOptions.value[Math.floor(Math.random() * pokemonsOptions.value.length)]);
    const isLoading = computed(() => pokemons.value.length === 0);

    const getPokemons = async (): Promise<Pokemon[]> => {
        const response = await pokemonApi.get<PokemonListResponse>("/?limit=151");

        const pokemonsArray = response.data.results.map((pokemon) => {
            const urlPaths = pokemon.url.split("/");
            const id = urlPaths.at(-2) ?? 0;
            return {
                id: +id,
                name: pokemon.name,
            }
        });

        return pokemonsArray.sort(() => Math.random() - 0.5);
    }

    const getNextRound = (howMany: number = 4) => {
        gameStatus.value = GameStatus.Playing;
        pokemonsOptions.value = pokemons.value.slice(0, howMany);
        pokemons.value = pokemons.value.slice(howMany);
    };

    const checkAnswer = (id: number) => {
        const correctPokemon = randomPokemon.value.id === id;
        if (correctPokemon) {
            gameStatus.value = GameStatus.Won;
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        gameStatus.value = GameStatus.Lost;


    };

    onMounted(async () => {
        pokemons.value = await getPokemons();

        getNextRound();
    });

    return {
        gameStatus,
        isLoading,
        pokemonsOptions,
        randomPokemon,

        getNextOptions: getNextRound,
        checkAnswer,
    }
}