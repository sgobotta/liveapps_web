import { useEffect, useState } from 'react';
import { shuffleArray } from '../../utils';
import imagesRepo from './imagesRepo';

const useImages = (): { images: string[]; shuffle: () => void } => {
  const [getImages, setImages] = useState<string[]>([]);
  const { fetchImages } = imagesRepo();

  useEffect(() => {
    const images = fetchImages();
    const shuffledImages: string[] = shuffleArray(images);
    setImages(shuffledImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function shuffle() {
    const images = fetchImages();
    const shuffledImages: string[] = shuffleArray(images);
    setImages(shuffledImages);
  }

  return {
    images: getImages,
    shuffle,
  };
};

export default useImages;
