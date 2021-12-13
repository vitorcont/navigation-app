import { showMessage } from 'react-native-flash-message';
import Window from './dimensions';

const Toaster = {
  success: (message: string, description: string) =>
    showMessage({
      message,
      description,
      type: 'success',
      backgroundColor: 'green',
      color: 'white',
      hideOnPress: true,
      statusBarHeight: Window.heightScale(0.04),
      icon: {
        icon: 'success',
        position: 'left',
      },
    }),

  error: (message: string, description: string) =>
    showMessage({
      message,
      description,
      type: 'danger',
      backgroundColor: 'red',
      color: 'white',
      hideOnPress: true,
      statusBarHeight: Window.heightScale(0.04),
      icon: {
        icon: 'danger',
        position: 'left',
      },
    }),

  warning: (message: string, description: string) =>
    showMessage({
      message,
      description,
      type: 'warning',
      backgroundColor: 'orange',
      color: 'white',
      hideOnPress: true,
      statusBarHeight: Window.heightScale(0.04),
      icon: {
        icon: 'warning',
        position: 'left',
      },
    }),

  info: (message: string, description: string) =>
    showMessage({
      message,
      description,
      type: 'info',
      color: 'white',
      hideOnPress: true,
      statusBarHeight: Window.heightScale(0.04),
      icon: {
        icon: 'info',
        position: 'left',
      },
    }),
};

export default Toaster;
