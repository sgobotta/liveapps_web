import { useEffect, useState } from 'react';
import { shuffleArray } from '../../utils';

const useImages = (): { images: string[] } => {
  const [getImages, setImages] = useState<string[]>([]);

  useEffect(() => {
    // const landscapeTotalImages = 30
    // const itemTotalImages = 21
    // const humanTotalImages = 20
    // const miscTotalImages = 30
    const landscapeTotalImages = 66;
    const itemTotalImages = 21;
    const humanTotalImages = 50;
    const miscTotalImages = 78;

    const padFilename = (filename: number) => String(filename).padStart(3, '0');

    const rootNamespace = 'images';
    const landscapeNamespace = (filename: string) =>
      `${rootNamespace}/landscape/${filename}.png`;
    const itemNamespace = (filename: string) =>
      `${rootNamespace}/items/${filename}.png`;
    const humanNamespace = (filename: string) =>
      `${rootNamespace}/humans/${filename}.png`;
    const miscNamespace = (filename: string) =>
      `${rootNamespace}/misc/${filename}.png`;

    const generateImageNames = (
      totalImages: number,
      namespaceFunction: (imageName: string) => string,
    ): string[] =>
      Array.from(Array(totalImages).keys()).map((imageName) =>
        namespaceFunction(padFilename(imageName)),
      );

    const landscapeImages = generateImageNames(
      landscapeTotalImages,
      landscapeNamespace,
    );
    const itemImages = generateImageNames(itemTotalImages, itemNamespace);
    const humanImages = generateImageNames(humanTotalImages, humanNamespace);
    const miscImages = generateImageNames(miscTotalImages, miscNamespace);

    const images = landscapeImages
      .concat(itemImages)
      .concat(humanImages)
      .concat(miscImages);
    const shuffledImages: string[] = shuffleArray(images);
    setImages(shuffledImages);
  }, []);

  return {
    images: getImages,
  };
};

export default useImages;
