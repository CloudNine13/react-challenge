import { TW } from 'twind';

const imageClassName = (tw: TW, color?: string) => {
  let bgColor = '';

  if (color === 'green') {
    bgColor = 'bg-green-100';
  } else if (color === 'red') {
    bgColor = 'bg-red-100';
  }

  return `${tw`w-20 h-20 rounded-xl border-1 border-solid border-black ${bgColor} flex items-center justify-center cursor-pointer`}`;
};

export { imageClassName };
