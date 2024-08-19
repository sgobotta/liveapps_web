import React, { useState } from 'react';
import livedj from './live-dj-iso-black.svg';
// import background from './background.svg'
import './App.css';
import useLongPress from './hooks/useLongPress';
import { preventDefault } from './utils';
import useImages from './hooks/useImages';

function App() {
  
  const { images } = useImages()

  function imageKey(index: number) { return `image-${index}`}

  // ---------------------------------------------------------------------------
  // longPressEvent
  //

  const [longPressCount, setlongPressCount] = useState(0)
  const [clickCount, setClickCount] = useState(0)

  const bindElementToCursor = (e: any) => {
    e.target.addEventListener('mousemove', function(ev: any) {
      e.target.style.transform = 'translateY('+(ev.clientY)+'px)';
      e.target.style.transform = 'translateX('+(ev.clientX)+'px)';            
    },false);
    setTimeout(() => {
      e.target.style.transform = ''
    }, 3000)
  }

  const onLongPress = (e: any) => {
    console.log('longpress is triggered', e.target);
    setlongPressCount(longPressCount + 1)
    bindElementToCursor(e)
  };

  const onClick = () => {
    console.log('click is triggered')
    setClickCount(clickCount + 1)
  }

  const defaultOptions = {
    shouldPreventDefault: false,
    delay: 500,
  };

  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  return (
    <div className="App h-screen max-h-screen overflow-y-hidden">
      <header className="
        App-header absolute w-full z-40
      ">
        <a
          href="https://dj.liveapps.com.ar"
        >
          <div className='
            animate-[bounce_3s_infinite]
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
              <img src={livedj} className="App-logo" alt="livedj logo" />
            </div>
          </div>
        </a>
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
        {images.map((imagePath: string, index: number) => (
          <div
            {...longPressEvent}
            onDragStart={preventDefault}
            onDrop={preventDefault}
            className={`
              border-[1px]] transition duration-[0.75s] active:-translate-x-0 active:translate-y-0 active:scale-x-[-0.8] active:scale-y-[0.8]
              hover:rounded-2xl hover:scale-[1.2] ${index % 2 ? 'hover:-rotate-6 active:rotate-0' : 'hover:rotate-6 active:-rotate-0'}
              hover:scale-[1.75] hover:z-50 hover:!border-[0px]
              grayscale hover:grayscale-0
            `}
            key={imageKey(index)}
            
          >
            <img
              src={process.env.PUBLIC_URL + imagePath}
              alt={`image-${index}`}
              className='
                transition-all duration-[2s] ease-[cubic-bezier(0.035,0.795,0.05,0.95)]
                hover:rounded-xl
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
