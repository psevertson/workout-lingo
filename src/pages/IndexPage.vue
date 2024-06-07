<template>
  <q-page>
    <div class="absolute-center column q-gutter-y-lg">
      <div class="text-h3 text-center">{{ workoutWord }}</div>
      <q-btn color="secondary" label="Randomize" @click="randomizeWord" />

      <div class="text-subtitle1 text-center">
        Setup your workout plan before you can begin
      </div>
      <q-btn color="secondary" label="Configure" @click="configure" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { Dialog } from 'quasar';
import { ref } from 'vue';
import ConfigureDialog from 'pages/ConfigureDialog.vue';
import { generate } from 'random-words';

const workoutWord = ref('');

function configure() {
  Dialog.create({
    component: ConfigureDialog,
  });
}

function randomizeWord() {
  workoutWord.value = generate({
    exactly: 1,
    minLength: 7,
    maxLength: 10,
    formatter: (word) => word.toUpperCase(),
  })[0];
}
</script>
