<template>
  <q-dialog ref="dialogRef" maximized @hide="onDialogHide">
    <q-layout view="hHh lpR fFf" container class="bg-white text-dark">
      <q-header elevated class="bg-primary">
        <q-toolbar>
          <q-toolbar-title class="text-center text-uppercase">
            <span class="text-h3 text-green">{{ completedStr }}</span>
            <span class="text-h3 text-bold text-white">{{ currentStr }}</span>
            <span class="text-h3 text-grey">{{ nextStr }}</span>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page>
          <div class="absolute-center column q-gutter-y-lg text-center">
            <template v-if="currentExercise">
              <div class="text-h3">{{ currentExercise.label }}</div>
              <div class="text-h5">{{ currentExercise.quantity }} {{ currentExercise.unit === 'seconds' ? 'Seconds' : 'Reps' }}</div>
            </template>
            <template v-else>
              <div class="text-h3">Congrats!</div>
              <div class="text-h5">You completed your workout</div>
            </template>
          </div>

          <div class="absolute-bottom text-center q-my-md">
            <q-btn color="accent" :label="isCompleted ? 'Done' : 'Next'" @click="incrementStep" />
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { alphabet, useAlphabetStore } from 'stores/alphabetStore';

const alphabetStore = useAlphabetStore();

defineEmits([...useDialogPluginComponent.emits]);

const props = defineProps<{
  workoutWord: string;
}>();

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();

const step = ref<number>(0);

const stepString = computed<[string, number][]>(() => {
  return props.workoutWord.split('').map((letter, index, arr) => {
    return [letter, index - arr.slice(0, index).filter((l) => !/^[A-Za-z]$/.test(l)).length];
  });
});

const completedStr = computed(() => {
  return stepString.value
    .filter((s) => s[1] < step.value || (s[1] === step.value && !/^[A-Za-z]$/.test(s[0])))
    .map((s) => s[0])
    .join('');
});

const currentStr = computed(() => {
  return stepString.value
    .filter((s) => s[1] === step.value && /^[A-Za-z]$/.test(s[0]))
    .map((s) => s[0])
    .join('');
});

const nextStr = computed(() => {
  return stepString.value
    .filter((s) => s[1] > step.value)
    .map((s) => s[0])
    .join('');
});

const isCompleted = computed(() => {
  return !currentStr.value;
});

function incrementStep() {
  if (isCompleted.value) {
    onDialogOK();
  }
  step.value++;
}

const currentExercise = computed(() => {
  const letterIndex = alphabet.findIndex((l) => l === currentStr.value.toUpperCase());
  const workout = alphabetStore.workouts[letterIndex];
  return workout;
});
</script>
