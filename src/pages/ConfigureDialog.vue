<template>
  <q-dialog ref="dialogRef" maximized @hide="onDialogHide">
    <q-layout view="hHh lpR fFf" container class="bg-white text-dark">
      <q-header elevated class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>Configure your Workout</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page>
          <q-list separator>
            <q-item v-for="(letter, index) in alphabet" :key="letter" clickable @click="editLetter(index)">
              <q-item-section class="text-h5">{{ letter }}</q-item-section>
              <q-item-section side>{{ getExercise(index) }}</q-item-section>
            </q-item>
          </q-list>
        </q-page>
      </q-page-container>

      <q-footer elevated class="bg-primary">
        <q-toolbar>
          <q-btn color="accent" icon="casino" label="Randomize" @click="randomize" />
          <q-space />
          <q-btn color="secondary" label="Save" @click="save" />
        </q-toolbar>
      </q-footer>
    </q-layout>
  </q-dialog>
</template>

<script setup lang="ts">
import { Dialog, useDialogPluginComponent } from 'quasar';
import { alphabet, useAlphabetStore, unitOptions, typeOptions, type Workout } from 'stores/alphabetStore';
import EditLetter from 'pages/EditLetter.vue';
import RandomizeDialog from 'pages/RandomizeDialog.vue';

const alphabetStore = useAlphabetStore();

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();

function save() {
  onDialogOK();
}

function editLetter(index: number) {
  Dialog.create({
    component: EditLetter,
    componentProps: {
      index,
      workout: alphabetStore.workouts[index],
    },
  }).onOk((workout: Workout) => {
    alphabetStore.$patch((state) => {
      state.workouts[index] = { ...workout, quantity: Math.floor(workout.quantity) };
    });
  });
}

function getExercise(index: number) {
  const workout = alphabetStore.workouts[index];
  if (workout.type) {
    const units = workout.unit === 'seconds' ? 'sec' : '';
    return `${workout.quantity} ${units} ${workout.label}`;
  } else {
    return '(Empty)';
  }
}

function randomize() {
  Dialog.create({
    component: RandomizeDialog,
  }).onOk(({ enabledTypes, chosenDifficulty }: { enabledTypes: (typeof typeOptions)[number]['value'][]; chosenDifficulty: 'easy' | 'medium' | 'hard' }) => {
    const randomWorkouts: (typeof typeOptions)[number][] = [];
    while (randomWorkouts.length < 26) {
      const randomTypes = [...enabledTypes].sort(() => 0.5 - Math.random()).map((t) => typeOptions.find((opt) => opt.value === t)!);
      randomWorkouts.push(...randomTypes);
    }
    const quantityOptions = {
      easy: [5, 6, 7],
      medium: [10, 11, 12],
      hard: [15, 16, 17],
    };
    const quantities: number[] = quantityOptions[chosenDifficulty] || quantityOptions.medium;

    alphabetStore.$patch({
      workouts: Array(26)
        .fill(null)
        .map((_, index) => {
          const randomUnit = Math.floor(Math.random() * unitOptions.length);
          const randomQty = Math.floor(Math.random() * quantities.length);
          return {
            label: randomWorkouts[index]!.label,
            type: randomWorkouts[index]!.value,
            unit: unitOptions[randomUnit].value,
            quantity: quantities[randomQty],
          };
        }),
    });
  });
}
</script>
