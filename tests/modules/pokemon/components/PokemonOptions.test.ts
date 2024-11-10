import PokemonOptions from "@/modules/pokemon/components/PokemonOptions.vue";
import { mount } from "@vue/test-utils";

const options = [
    { id: 1, name: 'Bulbasaur' },
    { id: 2, name: 'Ivysaur' },
    { id: 3, name: 'Venusaur' },
]

describe('PokemonOptions', () => {
    test('should render buttons with correct text', () => {
        const wrapper = mount(PokemonOptions, {
            props: {
                blockSelection: false,
                options: options,
                correctAnswer: 1
            }
        });

        const buttons = wrapper.findAll('button');

        expect(buttons.length).toBe(options.length);
        buttons.forEach((button, index) => {
            expect(button.text()).toBe(options[index].name);
        });
    });

    test('should emit "selection" with the correct id when clicked', async () => {
        const wrapper = mount(PokemonOptions, {
            props: {
                blockSelection: false,
                options: options,
                correctAnswer: 1
            }
        });

        const [b1, b2, b3] = wrapper.findAll('button');

        await b1.trigger('click');
        await b2.trigger('click');
        await b3.trigger('click');

        expect(wrapper.emitted('selectedOptions')).toBeTruthy();
        expect(wrapper.emitted('selectedOptions')?.[0]).toEqual([1]);
        expect(wrapper.emitted('selectedOptions')?.[1]).toEqual([2]);
        expect(wrapper.emitted('selectedOptions')?.[2]).toEqual([3]);


    });

    test('should disable buttons when blockSelection is true', () => {
        const wrapper = mount(PokemonOptions, {
            props: {
                blockSelection: true,
                options: options,
                correctAnswer: 1
            }
        });

        const buttons = wrapper.findAll('button');

        buttons.forEach(button => {
            const attributes = Object.keys(button.attributes());
            expect(attributes).toContain('disabled');
        });
    });

    test('should apply the "correct" class to the correct answer', () => {
        const correctAnswer = 3;
        const wrapper = mount(PokemonOptions, {
            props: {
                blockSelection: true,
                options: options,
                correctAnswer: correctAnswer,
            }
        });

        const buttons = wrapper.findAll('button');

        buttons.forEach((button, index) => {
            if (options[index].id == correctAnswer) {
                expect(button.classes()).toContain('correct');
            } else {
                expect(button.classes()).not.toContain('correct');
            }
        });
    });
});