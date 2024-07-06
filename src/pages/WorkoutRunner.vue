<template>
  <q-dialog ref="dialogRef" maximized @hide="onDialogHide">
    <q-layout view="hHh lpR fFf" container class="bg-white text-dark">
      <q-header elevated class="bg-primary">
        <q-toolbar>
          <q-toolbar-title class="text-center text-uppercase">
            <span class="text-h5 text-accent">{{ completedStr }}</span>
            <span class="text-h5 text-bold text-white">{{ currentStr }}</span>
            <span class="text-h5 text-grey">{{ nextStr }}</span>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page>
          <div class="absolute-center column q-gutter-y-lg text-center">
            <template v-if="currentExercise">
              <div class="text-h3">{{ currentExercise.label }}</div>

              <template v-if="currentExercise.unit === 'seconds'">
                <vue-countdown ref="timerRef" class="text-h5" :auto-start="false" :key="step" :time="currentExercise.quantity * 1000" :interval="10" v-slot="{ seconds, milliseconds }" @end="endTimer"> {{ seconds }}.{{ Math.floor(milliseconds / 10).toLocaleString(undefined, { minimumIntegerDigits: 2 }) }}</vue-countdown>
                <div class="text-h5 q-mt-none">Seconds</div>
                <q-btn v-if="!timerStarted" color="secondary" label="Start Timer" @click="startTimer" />
                <q-btn v-else-if="!timerDone" color="secondary" label="Skip" @click="skipTimer" />
              </template>
              <template v-else>
                <div class="text-h5">{{ currentExercise.quantity }}</div>
                <div class="text-h5 q-mt-none">Reps</div>
              </template>
              <q-btn color="secondary" :disable="!nextEnabled" label="Next" @click="incrementStep" />
            </template>
            <template v-else>
              <div class="text-h3">Congrats!</div>
              <div class="text-h5">You completed your workout</div>
              <q-btn color="secondary" label="Done" @click="onDialogOK" />
            </template>
          </div>

          <div class="absolute-bottom text-center q-my-md">
            <q-btn color="accent" label="End Workout" @click="endWorkout" />
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Dialog, useDialogPluginComponent } from 'quasar';
import { alphabet, useAlphabetStore } from 'stores/alphabetStore';
import VueCountdown from '@chenfengyuan/vue-countdown';

const alphabetStore = useAlphabetStore();

defineEmits([...useDialogPluginComponent.emits]);

const props = defineProps<{
  workoutWord: string;
}>();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const step = ref<number>(0);
const timerStarted = ref(false);
const timerDone = ref(false);

const timerRef = ref<InstanceType<typeof VueCountdown>>();

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

function incrementStep() {
  step.value++;
  timerDone.value = false;
  timerStarted.value = false;
}

function startTimer() {
  timerRef.value!.start();
  timerStarted.value = true;
}

function skipTimer() {
  timerRef.value!.end();
  endTimer();
}

function endTimer() {
  timerDone.value = true;
}

function endWorkout() {
  Dialog.create({
    title: 'End Workout?',
    message: 'You will lose all your current progress.',
    cancel: true,
  }).onOk(() => {
    onDialogCancel();
  });
}

const nextEnabled = computed(() => {
  return !(currentExercise.value?.unit === 'seconds' && !timerDone.value);
});

const currentExercise = computed(() => {
  const letterIndex = alphabet.findIndex((l) => l === currentStr.value.toUpperCase());
  const workout = alphabetStore.workouts[letterIndex];
  return workout;
});
</script>
