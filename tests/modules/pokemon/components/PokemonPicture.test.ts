import PokemonPicture from "@/modules/pokemon/components/PokemonPicture.vue";
import { mount } from "@vue/test-utils";

describe('PokemonPicture Component', () => {

    test('should render the hidden image whe showPokemon props is false', () => {
        const wrapper = mount(PokemonPicture, {
            props: {
                showPokemon: false,
                pokemonId: 1
            }
        });

        const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${1}.svg`;

        const image = wrapper.find('img');
        const attributes = image.attributes();

        expect(image.attributes('src')).toBe(imageSrc);
        expect(attributes).toEqual(
            expect.objectContaining({
                src: imageSrc,
                class: 'brightness-0 h-[200px]'
            })
        )
    });

    test('should render the image with the correct alt and src when showPokemon props is true', () => {
        const wrapper = mount(PokemonPicture, {
            props: {
                showPokemon: true,
                pokemonId: 4
            }
        });

        const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${4}.svg`;

        const image = wrapper.find('img');
        const attributes = image.attributes();

        expect(image.attributes('src')).toBe(imageSrc);
        expect(attributes).toEqual(
            expect.objectContaining({
                src: imageSrc,
                class: 'fade-in h-[200px]'
            })
        )

    });
});