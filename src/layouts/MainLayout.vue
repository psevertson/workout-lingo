<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Workout Lingo</q-toolbar-title>
        <q-space />
        <q-btn v-if="setupCompleted" round padding="4px" color="secondary" icon="settings" @click="configure" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <div class="absolute-center column no-wrap full-width q-px-xl q-gutter-y-lg" style="text-wrap: balance">
          <template v-if="setupCompleted">
            <div class="text-h6 text-center">Enter a Word or Phrase for your Workout:</div>
            <q-input autofocus input-class="text-center text-uppercase" outlined v-model="workoutWord" @keypress="checkKeyPress" />
            <q-btn color="accent" label="Begin Workout" :disable="!workoutWord.trim()" @click="startWorkout" />

            <div class="q-mt-xl q-pt-xl text-subtitle1 text-center">Or, Generate a Random Word:</div>
            <q-range v-model="randomRange" :min="5" :max="12" markers :marker-labels="objMarkerLabels" snap label-always color="primary" />
            <q-btn color="secondary" label="Random Word" @click="randomizeWord" />
          </template>
          <template v-else>
            <div class="text-subtitle1 text-center">Setup your workout plan before you can begin</div>
            <q-btn color="secondary" label="Configure" @click="configure" />
          </template>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
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
const randomRange = ref({ min: 7, max: 10 });

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
    minLength: randomRange.value.min,
    maxLength: randomRange.value.max,
    formatter: (word) => word.toUpperCase(),
  })[0];
}

const objMarkerLabels = { 5: '5', 12: '12' };

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
