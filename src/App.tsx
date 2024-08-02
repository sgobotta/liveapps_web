import React from 'react';
import livedj from './live-dj-iso-black.svg';
// import background from './background.svg'
import './App.css';
import { preventDefault, shuffleArray } from './utils';

function App() {
  const landscapeTotalImages = 66
  const itemTotalImages = 21
  const humanTotalImages = 50
  const miscTotalImages = 78

  const padFilename = (filename: number) => String(filename).padStart(3, '0')

  const rootNamespace = 'images'
  const landscapeNamespace = (filename: string) => `${rootNamespace}/landscape/${filename}.png`
  const itemNamespace = (filename: string) => `${rootNamespace}/items/${filename}.png`
  const humanNamespace = (filename: string) => `${rootNamespace}/humans/${filename}.png`
  const miscNamespace = (filename: string) => `${rootNamespace}/misc/${filename}.png`

  const generateImageNames = (totalImages: number, namespaceFunction: (imageName: string) => string) =>
    Array.from(Array(totalImages).keys()).map(imageName =>
      namespaceFunction(padFilename(imageName))
    )

  const landscapeImages = generateImageNames(landscapeTotalImages, landscapeNamespace)
  const itemImages = generateImageNames(itemTotalImages, itemNamespace)
  const humanImages = generateImageNames(humanTotalImages, humanNamespace)
  const miscImages = generateImageNames(miscTotalImages, miscNamespace)

  const images = landscapeImages.concat(itemImages).concat(humanImages).concat(miscImages)
  const shuffledImages = shuffleArray(images)

  function imageKey(index: number) { return `image-${index}`}

  return (
    <div className="App h-screen max-h-screen overflow-y-hidden">
      <header className="
        App-header absolute w-full z-40
      ">
        <div className='
          h-32
          w-4/12 sm:w-2/12 md:w-1/6 xl:w-1/12 2xl:w-1/12
          backdrop-filter backdrop-invert hover:backdrop-brightness-150 hover:backdrop-blur-3xl backdrop-blur-md
          -translate-x-4 hover:-translate-x-0 scale-100 active:scale-95 active:-translate-x-6
          fixed top-24 flex items-center
          shadow-2xl
          bg-gradient-to-r from-primary-500/0 via-accent-p-500/30 to-secondary-500/0
          border-accent-s-900/70 border-y-[1px] border-r-[1px]
          rounded-e-xl
          transition duration-300
          opacity-100 hover:bg-accent-p-300/0
        '>
          <div className='absolute right-2 z-50'>
            <img src={livedj} className="App-logo" alt="logo" />
          </div>
        </div>
      </header>
      <div className="
        grid grid-rows-3 grid-cols-3 gap-0 grow
        xs:grid-rows-4 xs:grid-cols-4
        sm:grid-rows-4 sm:grid-cols-4
        md:grid-rows-5 md:grid-cols-5
        lg:grid-rows-5 lg:grid-cols-6
        xl:grid-rows-6 xl:grid-cols-6
        2xl:grid-rows-12 2xl:grid-cols-12
      ">
        {shuffledImages.map((imagePath, index) => (
          <div
            onDragStart={preventDefault}
            onDrop={preventDefault}
            className={`border-[1px]] transition duration-[3s] active:-translate-x-0 active:translate-y-0 active:scale-x-[-1] hover:rounded-2xl hover:scale-[1.2] ${index % 2 ? 'hover:-rotate-12' : 'hover:rotate-12'}`} key={imageKey(index)}
          >
            <img
              src={process.env.PUBLIC_URL + imagePath}
              alt={`image-${index}`}
              className='
                transition-all duration-[3s]
                hover:rounded-3xl
                hover:translate-x-3 hover:-translate-y-3
                opacity-80 hover:opacity-100
                border-[1px] border-accent-s-900/80
              '
              fetchPriority={index < 16 ? 'high' : 'low'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
