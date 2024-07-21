import React from 'react';
import logo from './live-dj-iso-white.svg';
// import background from './background.svg'
import './App.css';
import { shuffleArray } from './utils';

function App() {
  const landscapeTotalImages = 66
  const itemTotalImages = 21
  const humanTotalImages = 50

  const padFilename = (filename: number) => String(filename).padStart(3, '0')

  const rootNamespace = 'images'
  const landscapeNamespace = (filename: string) => `${rootNamespace}/landscape/${filename}.png`
  const itemNamespace = (filename: string) => `${rootNamespace}/items/${filename}.png`
  const humanNamespace = (filename: string) => `${rootNamespace}/humans/${filename}.png`

  const generateImageNames = (totalImages: number, namespaceFunction: (imageName: string) => string) =>
    Array.from(Array(totalImages).keys()).map(imageName =>
      namespaceFunction(padFilename(imageName))
    )

  const landscapeImages = generateImageNames(landscapeTotalImages, landscapeNamespace)
  const itemImages = generateImageNames(itemTotalImages, itemNamespace)
  const humanImages = generateImageNames(humanTotalImages, humanNamespace)

  const images = landscapeImages.concat(itemImages).concat(humanImages)
  const shuffledImages = shuffleArray(images)

  function imageKey(index: number) { return `image-${index}`}

  return (
    <div className="App h-screen max-h-screen overflow-y-hidden">
      <header className="App-header absolute w-full z-40">
        <div className='
          backdrop-filter backdrop-blur-sm backdrop-grayscale baclk
          fixed top-24 flex justify-center items-center
          bg-accent-p-300/20 w-full shadow-2xl
          border-accent-p-400/20 border-t-[2px] border-b-[2px]
          h-32
        '>
          <div className='absolute left-0 z-50'>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <h1 className='text-primary-500'>
            <span className='font-medium'>Liveapps</span>
            <span className="text-accent-s-500 pl-2">
              (づ ◕‿◕ )づ
            </span>
          </h1>
        </div>
      </header>
      <div className="
        grid grid-rows-3 grid-cols-3 gap-0
        xs:grid-rows-4 xs:grid-cols-4
        sm:grid-rows-4 sm:grid-cols-4
        md:grid-rows-5 md:grid-cols-5
        lg:grid-rows-5 lg:grid-cols-6
        xl:grid-rows-6 xl:grid-cols-6
        2xl:grid-rows-8 2xl:grid-cols-8
      ">
        {shuffledImages.map((imagePath, index) => (
          <div className='border-[1px]]' key={imageKey(index)}>
            <img
              src={process.env.PUBLIC_URL + imagePath}
              alt={`image-${index}`}
              className='
                transition duration-500
                opacity-80 hover:opacity-100
                border-[1px] border-accent-s-500 border-opacity-10
              '
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
