import React from 'react';
import livedj from './live-dj-iso-black.svg';
// import background from './background.svg'
import './App.css';
import { preventDefault, shuffleArray } from './utils';

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
      <header className="
        App-header absolute w-full z-40
      ">
        <div className='
          backdrop-filter backdrop-blur-sm
          fixed top-24 flex justify-center items-center
          w-full shadow-2xl
          bg-gradient-to-r from-primary-500/0 via-accent-p-500/30 to-secondary-500/0
          border-accent-s-900/70 border-y-[1px]
          h-32
          transition duration-300
          opacity-100 hover:bg-accent-p-300/0
        '>
          <div className='absolute left-0 z-50'>
            <img src={livedj} className="App-logo" alt="logo" />
          </div>
          <h1>
            <span className='text-accent-s-50 font-normal'>Liveapps</span>
            <span className="text-accent-s-50 font-extralight pl-2">
              (づ ◕‿◕ )づ
            </span>
          </h1>
        </div>
      </header>
      <div className="
        grid grid-rows-3 grid-cols-3 gap-0 grow
        xs:grid-rows-4 xs:grid-cols-4
        sm:grid-rows-4 sm:grid-cols-4
        md:grid-rows-5 md:grid-cols-5
        lg:grid-rows-5 lg:grid-cols-6
        xl:grid-rows-6 xl:grid-cols-6
        2xl:grid-rows-8 2xl:grid-cols-8
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
