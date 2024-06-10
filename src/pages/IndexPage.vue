<template>
  <q-page>
    <div class="absolute-center column q-gutter-y-lg">
      <template v-if="setupCompleted">
        <div class="text-subtitle1 text-center">Enter a Word for your Workout</div>
        <q-input autofocus input-class="text-center text-uppercase" outlined v-model="workoutWord" @keypress="checkKeyPress" />
        <q-btn color="secondary" label="Random Word" @click="randomizeWord" />
        <q-btn color="accent" label="Begin Workout" :disable="!workoutWord.trim()" @click="startWorkout" />
      </template>
      <template v-else>
        <div class="text-subtitle1 text-center">Setup your workout plan before you can begin</div>
      </template>
    </div>
    <div class="absolute-bottom text-center q-my-md">
      <q-btn color="secondary" label="Configure" @click="configure" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { Dialog } from 'quasar';
import { ref, computed } from 'vue';
import { useAlphabetStore } from 'stores/alphabetStore';
import ConfigureDialog from 'pages/ConfigureDialog.vue';
import WorkoutRunner from 'pages/WorkoutRunner.vue';
import { generate } from 'random-words';

const alphabetStore = useAlphabetStore();
const workoutWord = ref('');

function configure() {
  Dialog.create({
    component: ConfigureDialog,
  });
}

function startWorkout() {
  Dialog.create({
    component: WorkoutRunner,
    componentProps: {
      workoutWord: workoutWord.value,
    },
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

const setupCompleted = computed(() => {
  return alphabetStore.workouts.every((workout) => !!workout.type);
});

function checkKeyPress(event: KeyboardEvent) {
  const char = String.fromCharCode(event.keyCode);
  if (!/^[A-Za-z ]+$/.test(char)) {
    event.preventDefault();
  }
}
</script>
