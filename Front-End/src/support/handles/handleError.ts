import { Notify } from 'quasar';

export const HandlError = (error: any) => {
  //console.log(error);
  //alert(error);
  if (!error.response) {
    //console.log(error);
    notify('Error de conexión');
  } else if (error.response.hasOwnProperty('data')) {
    const errorData = error.response.data;
    if (errorData.hasOwnProperty('message')) notify(errorData.message);
  } else if (error.response.status === 401) {
    location.reload();
  }
};

const notify = (message: string) => {
  Notify.create({
    message: message,
    color: 'negative',
    textColor: 'white',
  });
};
