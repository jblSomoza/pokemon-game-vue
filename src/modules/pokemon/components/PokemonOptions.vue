<template>
  <section class="mt-5 flex flex-col">
    <button
      v-for="{ name, id } in options"
      :key="id"
      :class="[
        'capitalize disabled:shadow-none disable:bg-gray-300',
        {
          correct: id === correctAnswer && blockSelection,
          incorrect: id !== correctAnswer,
        },
      ]"
      :disabled="blockSelection"
      @click="$emit('selectedOptions', id)"
    >
      {{ name }}
    </button>
  </section>
</template>

<script setup lang="ts">
import type { Pokemon } from '../interfaces';

interface Props {
  options: Pokemon[];
  blockSelection: boolean;
  correctAnswer: number;
}

defineProps<Props>();
defineEmits<{
  selectedOptions: [id: number];
}>();
</script>

<style scoped>
button {
  @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}

.correct {
  @apply bg-green-500 disabled:bg-green-300 cursor-not-allowed shadow-none hover:bg-green-300 hover:shadow-none;
}

.wrong {
  @apply bg-red-500 disabled:bg-red-300 cursor-not-allowed;
}
</style>
