// import PokemonOptions from "@/modules/pokemon/components/PokemonOptions.vue";
// import { usePokemonGame } from "@/modules/pokemon/composables/usePokemonGame";
// import { GameStatus } from "@/modules/pokemon/interfaces";
// import PokemonGame from "@/modules/pokemon/pages/PokemonGame.vue";
// import { mount } from "@vue/test-utils";
// import type { Mock } from "vitest";

vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
    usePokemonGame: vi.fn()
}));


describe('PokemonGame', () => {
    // test('should initialize with default values', () => {
    //     (usePokemonGame as Mock).mockReturnValue({
    //         randomPokemon: null,
    //         isLoading: false,
    //         gameStatus: GameStatus.Playing,
    //         PokemonOptions: [],
    //         checkAnswer: vi.fn(),
    //         getNextRound: vi.fn(),
    //     });

    //     const wrapper = mount(PokemonGame);

    //     expect(wrapper.get('h1').text()).toBe('Espere un momento');


    // });
});