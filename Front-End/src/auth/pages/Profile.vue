<template>
  <q-page padding>
    <page-header>
      <template #title>Perfil</template>
    </page-header>
    <page-body>
      <!-- <div class="q-pa-md row justify-center items-center content-center"> -->
      <q-card
        flat
        bordered
        class="col-6 col-xs-12 col-sm-10 col-lg-10 col-md-10"
      >
        <q-card-section class="text-center">
          <!-- <input
            type="file"
            id="camera"
            accept="image/*"
            capture="camera"
            ref="camera"
            class="inputget"
            @change="changeCamera"
            @clickFile="isClick"
          /> -->
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <q-avatar size="150px" class="q-mb-sm">
              <img
                :src="
                  profileImage.urlImagen == null
                    ? 'https://cdn.quasar.dev/img/boy-avatar.png'
                    : profileImage.urlImagen
                "
                class="img-effect"
                ref="photo"
              />
              <q-btn
                fab
                color="primary"
                icon="fas fa-camera"
                class="absolute"
                style="
                  bottom: 6px;
                  right: 40px;
                  transform: translateX(100%);
                  padding: 7px !important;
                  min-height: 25px !important;
                  min-width: 25px !important;
                  border: 2px solid #ebeff2;
                "
                @click="showCropper = true"
              />
            </q-avatar>
          </transition>

          <q-item>
            <q-item-section>
              <q-item-label class="text-weight-bolder text-grey"
                >Juan Diego Luna Olea</q-item-label
              >
              <q-item-label class="text-caption text-weight-light text-grey"
                >Medico General</q-item-label
              >
            </q-item-section>
          </q-item>

          <avatar-cropper
            @uploading="handleUploading"
            @uploaded="handleUploaded"
            @completed="handleCompleted"
            @error="handlerError"
            v-model="showCropper"
            :request-options="requestOptions()"
            :upload-url="urlUpload"
            :labels="{ submit: 'Ok', cancel: 'Cancelar' }"
          />
          <q-inner-loading
            :showing="visible"
            label="Cargando imagen"
            label-class="text-blue-grey-14"
            label-style="font-size: 1.1em"
            class="top-inner-loading"
          />
        </q-card-section>
        <q-separator />

        <q-tabs
          v-model="tab"
          dense
          no-caps
          align="left"
          inline-label
          class="text-white shadow-2"
          style="background-color: rgb(45, 62, 80)"
        >
          <q-tab name="mis-datos" icon="edit" label="Mis datos" />
          <q-tab name="contrasenia" icon="key" label="Contraseña" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mis-datos">
            <form-medico :id="0" :isLoadProfile="false" typeControl="Medico" />
          </q-tab-panel>

          <q-tab-panel name="contrasenia" animated>
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      <!-- </div> -->
    </page-body>
    <page-footer />
  </q-page>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue';
import formMedico from '../../adminApp/components/Medico/formMedico.vue';
import { ProfileImageModel } from '../types/activationModel';
import useHookUsuario from '../../adminApp/hooks/Seguridad/hookUsuarios';
import { useCommonStore } from 'src/stores/all';
import { HandlError } from 'src/support/handles/handleError';
import { useQuasar } from 'quasar';
import AvatarCropper from 'vue-avatar-cropper';

const showCropper = ref(false);
const message = ref('ready');
const token = ref('');
const urlUpload = ref('');
const visible = ref(false);
const showSimulatedReturnData = ref(false);

const showTextLoading = () => {
  visible.value = true;
  showSimulatedReturnData.value = false;
};
const hideTextLoading = () => {
  visible.value = false;
  showSimulatedReturnData.value = true;
};
const requestOptions = () => {
  const localToken = JSON.parse($q.localStorage.getItem('token') || '{}');
  token.value = localToken;

  return {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  };
};

const setUrlUpload = () => {
  urlUpload.value = `${process.env.API}/api/Usuarios/ChangePhoto`;
};

const camera = ref<HTMLDivElement>(null);
// const photo = ref<HTMLImageElement>(null);
const photo = ref<string>('');
const isClick = ref<boolean>(false);
const isLoadProfile = ref<boolean>(true);
const profileImage = ref<ProfileImageModel>({
  userId: 0,
  urlImagen: '',
  imagenBase64: '',
  nombreImagen: '',
});

const tab = ref('mis-datos');

const { profileResult, GetProfile, photoUrl, ChangePhotoProfile } =
  useHookUsuario();
const $commonStore = useCommonStore();
const $q = useQuasar();

const handleUploading = (form, xhr) => {
  showTextLoading();
  // message.value = 'uploading...';
};
const handleUploaded = async ({ form, request, response }) => {
  if (response.status == 200) {
    hideTextLoading();
    await doGetProfile();
  }
};
const handleCompleted = ({ form, request, response }) => {
  message.value = 'upload completed.';
};
const handlerError = (message, type, xhr) => {
  console.log(message);
  message = 'Oops! Something went wrong...';
};

const doGetProfile = async () => {
  $commonStore.Add_Request();
  // const localToken: any = $q.localStorage.getItem('token');
  await GetProfile();
  profileImage.value = profileResult.value;
};

onBeforeMount(async () => {
  try {
    setUrlUpload();
    // setHeader();
    await doGetProfile();
  } catch (error: any) {
    $commonStore.Remove_Request();
    HandlError(error);
  }
});

const takePhoto = () => {
  camera.value.click();
};

const changeCamera = async (e: any) => {
  try {
    $commonStore.Add_Request();
    const base64String = await convertBlobToBase64(e.target.files[0]);
    profileImage.value.imagenBase64 = base64String;
    profileImage.value.nombreImagen = e.target.files[0].name;

    await ChangePhotoProfile(profileImage.value);
    await doGetProfile();
  } catch (error: any) {
    $commonStore.Remove_Request();
    HandlError(error);
  }
  // console.log(base64String);
};

const convertBlobToBase64 = (blob: any) =>
  new Promise((resolve, reject) => {
    const reader: any = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      //resolve(reader.result);
      resolve(reader.result.replace('data:', '').replace(/^.+,/, ''));
      //resolve(e.target.result.replace("data:", "").replace(/^.+,/, ""));
    };
    reader.readAsDataURL(blob);
  });
</script>
<style scoped>
.img-effect {
  padding: 0.25rem;
  background-color: #00adef;
  border: 2px solid #ebeff2;
  border-radius: 0.25rem;
}
.inputget {
  font-size: 1px;
  position: absolute;
  z-index: -1;
}
.form-style {
  /* margin: 0 auto;
  height: calc(100vh - 220px); */
  margin: 0 auto;
  /* height: calc(100vh - 220px); */
}

.top-inner-loading {
  margin-top: -100px;
  color: #00adef !important;
}
</style>
