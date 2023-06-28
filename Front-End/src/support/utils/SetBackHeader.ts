import { BackModel } from 'src/adminApp/types/sistema/backModel';
import { LocalStorage } from 'quasar';

// export const SetBackHeader = (): BackModel => {

// };

export const SetBackHeader = (
  title: string,
  toRoute: string,
  show: boolean
) => {
  const objModel = {};
  objModel.title = title;
  objModel.toRoute = toRoute;
  objModel.show = show;

  LocalStorage.set('backheader', JSON.stringify(objModel));

  return objModel;
};
