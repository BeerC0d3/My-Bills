import { Notify } from 'quasar';

export const HandlSuccess = (message: string) => {
  notify(message);
};

const notify = (message: string) => {
  Notify.create({
    message: message,
    color: 'positive',
    textColor: 'white',
    position: 'center',
  });
};
