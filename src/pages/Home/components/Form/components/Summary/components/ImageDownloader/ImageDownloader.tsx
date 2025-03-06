import { useEffect, useRef } from 'react';
import { ImageDownloaderComponent } from './ImageDownloader.WC';
import './ImageDownloader.WC';

type DownloaderType = {
  images: Array<string>;
};

const ImageDownloader = ({ images }: DownloaderType) => {
  const imageDownloaderRef = useRef<ImageDownloaderComponent | null>(null);

  if (imageDownloaderRef.current) {
    imageDownloaderRef.current.images = images;
  }

  useEffect(() => {
    const imageDownloader = imageDownloaderRef.current;
    if (imageDownloader) imageDownloader.images = images;
  }, [images]);

  return <wc-image-downloader ref={imageDownloaderRef}></wc-image-downloader>;
};

export { ImageDownloader };
