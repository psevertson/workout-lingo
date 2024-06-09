@ -0,0 +1,45 @@
<template>
  <q-dialog ref="dialogRef" persistent @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-form class="q-ma-md" greedy @submit="save">
        <div class="row items-start q-gutter-x-sm">
          <q-avatar color="secondary" text-color="white" size="xl">{{ alphabet[index] }}</q-avatar>
          <div class="col column">
            <q-select autofocus :rules="[(v: string) => !!v]" lazy-rules="ondemand" label="Exercise" outlined :modelValue="data.type" dense :options="typeOptions" map-options @update:modelValue="updateType" />
            <q-input v-if="data.type === 'custom'" :rules="[(v: string) => !!v]" lazy-rules="ondemand" label="Exercise Name" outlined v-model="data.label" dense />
          </div>
        </div>

        <div class="column q-gutter-y-xs">
          <div class="row q-gutter-x-sm">
            <q-select class="col" label="Units" :rules="[(v: string) => !!v]" lazy-rules="ondemand" outlined v-model="data.unit" emit-value map-options dense :options="unitOptions" />
            <q-input class="col" label="Amount" :rules="[(v: number) => v >= 1]" lazy-rules="ondemand" outlined v-model.number="data.quantity" dense />
          </div>
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
import { ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { alphabet, typeOptions, unitOptions, type Workout } from 'stores/alphabetStore';

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
  if (type.value === 'custom') {
    data.value.label = '';
  } else {
    data.value.label = type.label;
  }
}

function save() {
  onDialogOK(data.value);
}
</script>
<style lang="scss">
.q-field--with-bottom {
  padding-bottom: 10px;
}
</style>
