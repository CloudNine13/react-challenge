import { tw } from 'twind';

const getSuccessMessage = (message: string) => {
  const root = document.getElementById('toast');
  root!.innerHTML = `
        <div id="toast-success" class="${tw`flex items-center w-full max-w-xs p-4 mb-4 text-gray-400 bg-gray-800 rounded-lg`}">
            <div class="${tw`inline-flex items-center justify-center w-8 h-8 text-green-500 bg-green-100 rounded-lg`}">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
            </div>
            <div class="${tw`text-sm font-normal`}">${message}</div>
        </div>
    `;
};

export { getSuccessMessage };
