<template>
  <q-page padding>
    <page-header>
      <!-- <template #buttons-left>
        <page-header-btn-back label="Medicos" />
      </template> -->
      <template #title>Inicio</template>
    </page-header>
    <page-body>
      <h3>Hola mundo</h3>
      <div class="q-pa-lg">
        <p v-for="i in 20" :key="i">
          Lorems ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate
          aperiam suscipit blanditiis iusto earum, velit adipisci sequi ex
          ipsum, aut non. Doloremque iusto eius at quibusdam blanditiis ex vero
          eaque?
        </p>
      </div>
    </page-body>

    <page-footer />
  </q-page>
</template>
