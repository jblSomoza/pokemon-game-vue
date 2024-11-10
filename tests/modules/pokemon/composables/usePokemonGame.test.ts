import { flushPromises } from "@vue/test-utils";
import MockAdapter from 'axios-mock-adapter';

import { usePokemonGame } from "@/modules/pokemon/composables/usePokemonGame";
import { pokemonApi } from "@/modules/pokemon/api/pokemonApi";

import { withSetup } from "../../../utils/with-setup";
import { fakePokemons } from "../../data/fake-pokemons";
import { GameStatus } from "@/modules/pokemon/interfaces";

const mockPokemonApi = new MockAdapter(pokemonApi);

mockPokemonApi.onGet("/?limit=151").reply(200, {
    results: fakePokemons
});

vi.mock('canvas-confetti', () => ({
    default: vi.fn()
}));


describe('usePokemonGame', () => {
    test('should initialize with default values', async () => {
        const [results] = withSetup(usePokemonGame);

        expect(results.gameStatus.value).toBe("playing");
        expect(results.isLoading.value).toBe(true);
        expect(results.pokemonsOptions.value).toEqual([]);
        expect(results.randomPokemon.value).toBeUndefined();

        await flushPromises();

        expect(results.isLoading.value).toBe(false);
        expect(results.pokemonsOptions.value).toHaveLength(4);
        expect(results.randomPokemon.value).toEqual({
            id: expect.any(Number),
            name: expect.any(String)
        });
    });

    // test('should correctly handle getNextRound', async () => {
    //     const [results] = withSetup(usePokemonGame);
    //     await flushPromises();

    //     results.gameStatus.value = GameStatus.Won;

    //     // Estímulo
    //     results.getNextOptions(5);

    //     expect(results.gameStatus.value).toBe(GameStatus.Playing);
    //     expect(results.pokemonsOptions.value).toHaveLength(5);
    // });

    test('should correctly handle handle getNextRound and return different pokemons', async () => {
        const [results] = withSetup(usePokemonGame);
        await flushPromises();

        const firstPokemon = results.pokemonsOptions.value.map((pokemon: { name: any; }) => pokemon.name);

        results.getNextOptions(5);

        const secondPokemon = results.pokemonsOptions.value.map((pokemon: { name: any; }) => pokemon.name);

        secondPokemon.forEach((pokemon: any) => {
            expect(firstPokemon).not.toContain(pokemon);
        });
    });

    test('should correctly handle a incorrect answer', async () => {
        const [results] = withSetup(usePokemonGame);
        await flushPromises();

        results.checkAnswer(-1);

        expect(results.gameStatus.value).toBe("lost");
    });

    // test('should correctly handle a correct answer', async () => {
    //     const [results] = withSetup(usePokemonGame);
    //     await flushPromises();

    //     expect(results.gameStatus.value).toBe(GameStatus.Playing);

    //     results.checkAnswer(results.randomPokemon.value.id);

    //     expect(results.gameStatus.value).toBe(GameStatus.Won);
    // });


});