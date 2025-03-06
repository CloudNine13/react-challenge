import { ToastTypesEnum } from '../../enums/ToastTypes';
import { getErrorMessage } from './getErrorMessage';
import { getSuccessMessage } from './getSuccessMessage';
import { getWarningMessage } from './getWarningMessage';

type HookProps = {
  type: ToastTypesEnum;
  message: string;
};

const displayToast = ({ type, message }: HookProps) => {
  setTimeout(() => {
    const toast = document.getElementById('toast');
    toast!.innerHTML = '';
  }, 5000);

  if (type === ToastTypesEnum.ERROR) {
    getErrorMessage(message);
  }

  if (type === ToastTypesEnum.SUCCESS) {
    getSuccessMessage(message);
  }

  if (type === ToastTypesEnum.WARNING) {
    getWarningMessage(message);
  }
};

export { displayToast };
