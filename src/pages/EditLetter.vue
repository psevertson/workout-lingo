<template>
  <q-dialog ref="dialogRef" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-form class="q-ma-md" greedy @submit="save">
        <div class="col column">
          <q-avatar class="q-mx-auto q-mb-md" color="secondary" text-color="white" size="80px">{{ alphabet[index] }}</q-avatar>
          <q-select autofocus :rules="[(v: string) => !!v]" lazy-rules="ondemand" label="Exercise" outlined :modelValue="data.type" dense :options="typeOptions" map-options @update:modelValue="updateType" />
          <q-input v-if="['custom_reps', 'custom_seconds'].includes(data.type)" :rules="[(v: string) => !!v]" lazy-rules="ondemand" label="Exercise Name" outlined v-model="data.label" dense />
          <q-input class="col" :label="quantityLabel" :rules="[(v: number) => v >= 1]" lazy-rules="ondemand" outlined v-model.number="data.quantity" dense />
        </div>

        <q-card-actions align="around">
          <q-btn color="secondary" class="col" @click="onDialogCancel">Cancel</q-btn>
          <q-btn color="accent" class="col" type="submit">Save</q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { alphabet, typeOptions, type Workout } from 'stores/alphabetStore';

const props = defineProps<{
  index: number;
  workout: Workout;
}>();

const data = ref<Workout>({
  ...props.workout,
});

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogCancel, onDialogOK } = useDialogPluginComponent();

function updateType(type: (typeof typeOptions)[number]) {
  data.value.type = type.value;
  data.value.unit = type.type;
  if (['custom_reps', 'custom_seconds'].includes(type.value)) {
    data.value.label = '';
  } else {
    data.value.label = type.label;
  }
}

const quantityLabel = computed(() => {
  const matchingExercise = typeOptions.find((tp) => tp.value === data.value.type);
  if (matchingExercise?.type === 'seconds') {
    return 'Seconds';
  } else if (matchingExercise?.type === 'reps') {
    return 'Reps';
  } else {
    return 'Amount';
  }
});

function save() {
  onDialogOK(data.value);
}
</script>
<style lang="scss">
.q-field--with-bottom {
  padding-bottom: 10px;
}
</style>
