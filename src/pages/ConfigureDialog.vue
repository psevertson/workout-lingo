@ -0,0 +1,45 @@
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
            <q-item v-for="(letter, index) in alphabet" :key="letter" clickable>
              <q-item-section class="text-h5">{{ letter }}</q-item-section>
              <q-item-section side>{{ index }} Push-ups</q-item-section>
            </q-item>
          </q-list>
        </q-page>
      </q-page-container>

      <q-footer elevated class="bg-primary">
        <q-toolbar>
          <q-btn color="accent" icon="casino" label="Randomize" />
          <q-space />
          <q-btn color="secondary" label="Save" @click="save" />
        </q-toolbar>
      </q-footer>
    </q-layout>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { alphabet } from 'stores/alphabetStore';

defineEmits([...useDialogPluginComponent.emits]);

const { dialogRef, onDialogHide, onDialogOK } =
  //onDialogCancel
  useDialogPluginComponent();
// const store = useAlphabetStore();

function save() {
  onDialogOK();
}
</script>
