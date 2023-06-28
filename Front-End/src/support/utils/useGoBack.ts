import { routerInstance } from 'boot/router';

export default function useGoBack() {
  const pathArray = routerInstance.currentRoute.value.path.split('/');

  if (pathArray.length > 2) {
    pathArray.pop();
    const newPath = pathArray.join('/');
    routerInstance.push(newPath);
  }
}
