import { pokemonApi } from "@/modules/pokemon/api/pokemonApi";

describe('Pokemon API', () => {

    test('should be configured as expected', () => {
        const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

        expect(pokemonApi.defaults.baseURL).toBe(baseUrl);
    });
});