<template>
  <q-page class="fit row wrap justify-center items-center content-center">
    <div
      class="col-6 col-xs-12 col-sm-6 col-lg-6 col-md-6 q-pl-xs q-pr-xs self-center"
    >
      <q-card class="q-ma-none">
        <div class="text-center">
          <q-img
            src="~assets/logo.png"
            spinner-color="white"
            class="rounded-borders"
            style="max-width: 500px"
          ></q-img>
        </div>
        <p class="text-weight-bolder text-center text-grey">Activar cuenta</p>
        <q-card-section v-if="activation?.isValid">
          <q-form
            class="q-gutter-md"
            ref="formActivation"
            @submit="doActivation"
          >
            <q-input
              outlined
              clearable
              v-model="activation.usuario"
              type="email"
              label="Email"
              class=""
              readonly
            >
              <template v-slot:prepend>
                <q-icon name="email" color="primary" />
              </template>
            </q-input>
            <q-input
              outlined
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
              label="Password"
              lazy-rules
              :rules="[(val) => !!val || 'Este campo es obligatorio']"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="primary" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-input
              outlined
              v-model="repitepassword"
              :type="isPwd ? 'password' : 'text'"
              label="Repite password"
              lazy-rules
              :rules="[
                (val) => !!val || 'Este campo es obligatorio',
                (val) => val == password || 'Las contraseñas no coinciden',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="primary" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-card-actions>
              <div class="row full-width items-center">
                <div class="col-12">
                  <q-btn
                    outline
                    rounded
                    size="md"
                    color="primary"
                    class="full-width"
                    label="Activar"
                    type="submit"
                  />
                </div>
              </div>
            </q-card-actions>
          </q-form>
        </q-card-section>

        <q-card-section>
          <p
            v-if="activation?.isValid"
            class="text-caption text-center text-weight-light text-grey"
          >
            Crea su contraseña para accesar al sistema
          </p>
          <q-banner
            v-if="!activation?.isValid && activation?.mensaje != ''"
            rounded
            dense
            inline-actions
            class="text-white bg-red"
          >
            {{ activation?.mensaje }}
          </q-banner>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  CheckActivationModel,
  ActivationModel,
} from '../types/activationModel';
import useHookUsuario from '../../app/hooks/Seguridad/hookUsuarios';
import { useCommonStore } from 'src/stores/all';
import { HandlError } from 'src/support/handles/handleError';

const password = ref('');
const repitepassword = ref('');
const isPwd = ref(true);
const formActivation = ref<any>(null);
// const code = ref<string | undefined>($route.query.code?.toString());

const $route = useRoute();
const $router = useRouter();
const $commonStore = useCommonStore();

const { CheckActivation, CheckActivationResult, Activation } = useHookUsuario();
const activation = ref<CheckActivationModel | undefined>({
  isValid: false,
  mensaje: '',
  usuario: '',
});

onBeforeMount(async () => {
  const code: string | undefined = $route.query.code?.toString();
  // code.value = $route.query.code?.toString();
  if (typeof code === 'string') await CheckActivation(code);
  activation.value = CheckActivationResult.value;
});

const doActivation = async () => {
  try {
    formActivation.value.validate().then(async (success: any) => {
      if (success) {
        $commonStore.Add_Request();

        const model: ActivationModel = {
          Username: activation.value?.usuario,
          Password: password.value,
          CodigoActivacion: $route.query.code?.toString(),
        };

        await Activation(model);

        $router.push('/auth/login');
      }
    });
  } catch (error: any) {
    $commonStore.Remove_Request();
    HandlError(error);
  }
};
</script>
