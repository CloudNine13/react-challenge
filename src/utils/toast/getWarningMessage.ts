import { tw } from 'twind';

const getWarningMessage = (message: string) => {
  const root = document.getElementById('toast');
  root!.innerHTML = `
        <div id="toast-success" class="${tw`flex items-center w-full max-w-xs p-4 mb-4 text-gray-400 bg-gray-800 rounded-lg`}">
            <div class="${tw`inline-flex items-center justify-center w-8 h-8 text-yellow-500 bg-yellow-100 rounded-lg dark:bg-yellow-800 dark:text-yellow-200`}">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
                </svg>
            </div>
            <div class="${tw`text-sm font-normal`}">${message}</div>
        </div>
    `;
};

export { getWarningMessage };
