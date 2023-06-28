<template>
  <q-card class="my-card">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">Close icon</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-form class="q-gutter-md">
      <q-card-section>
        <div class="row q-mb-sm">
          <q-input outlined v-model="txt" :rules="[(val) => !!val || 'Este campo es requerido']" ref="nombre"
            label="Nombre" class="col">

          </q-input>
        </div>
        <div class="row q-mb-sm">
          <q-input outlined v-model="txt" :rules="[(val) => !!val || 'Este campo es requerido']" ref="nombre"
            label="Apellido" class="col">

          </q-input>
        </div>

      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn label="Cancelar" v-close-popup color="warning" />
        <q-btn label="Guardar" color="primary" type="submit" />
      </q-card-actions>

    </q-form>
  </q-card>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const txt = ref('')


</script>
