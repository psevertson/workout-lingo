<template>
  <q-dialog ref="dialogRef" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-form class="q-ma-md" greedy @submit="save">
        <div class="text-h5">Randomize Workout</div>
        <div class="row justify-between items-end">
          <div>Choose workouts:</div>
          <q-btn padding="0" dense flat color="primary" :label="showSelectAll ? 'Select All' : 'Deselect All'" @click="toggleSelectAll" />
        </div>

        <q-list bordered separator dense style="max-height: 50vh" class="scroll-y">
          <q-item dense tag="label" v-ripple v-for="typeOpt in workoutOptions" :key="typeOpt.value">
            <q-item-section side><q-checkbox dense v-model="enabledTypes" :val="typeOpt.value" /></q-item-section>
            <q-item-section>
              <q-item-label>{{ typeOpt.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <div class="q-mt-md">Choose Difficulty:</div>
        <div class="row q-gutter-sm q-mb-md">
          <q-radio dense v-model="chosenDifficulty" val="easy" label="Easy" />
          <q-radio dense v-model="chosenDifficulty" val="medium" label="Medium" />
          <q-radio dense v-model="chosenDifficulty" val="hard" label="Hard" />
        </div>

        <q-card-actions align="around">
          <q-btn color="secondary" class="col" @click="onDialogCancel">Cancel</q-btn>
          <q-btn color="accent" class="col" type="submit" :disable="!enabledTypes.length">Save</q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { typeOptions } from 'stores/alphabetStore';

const enabledTypes = ref<(typeof typeOptions)[number]['value'][]>([]);
const chosenDifficulty = ref<'easy' | 'medium' | 'hard'>('medium');

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

const workoutOptions = typeOptions.filter((t) => !['custom_reps', 'custom_seconds'].includes(t.value));

const showSelectAll = computed(() => {
  return workoutOptions.find((w) => !enabledTypes.value.includes(w.value));
});

function toggleSelectAll() {
  if (showSelectAll.value) {
    enabledTypes.value = workoutOptions.map((w) => w.value);
  } else {
    enabledTypes.value = [];
  }
}

function save() {
  onDialogOK({
    enabledTypes: enabledTypes.value,
    chosenDifficulty: chosenDifficulty.value,
  });
}
</script>
<style lang="scss">
.q-field--with-bottom {
  padding-bottom: 10px;
}
</style>
