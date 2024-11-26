import React from 'react';
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

  // const [longPressCount, setlongPressCount] = useState(0)
  // const [clickCount, setClickCount] = useState(0)

  const bindElementToCursor = (e: any) => {
    const initialX = e.clientX
    const initialY = e.clientY

    const onMouseMove = (ev: any) => {
      const clientX = ev.clientX
      const clientY = ev.clientY

      const skewX = ((initialX - clientX) / 10) * -1
      const skewY = ((initialY - clientY) / 10) * -1

      e.target.style.transform = `skew(${4 * skewX}deg, ${4 * skewY}deg) scale(${Math.sin(skewX) + 1.5}, ${Math.sin(skewY) + 1.5})`;
      document.body.style.cursor = 'move'
      document.body.style.filter = `saturate(${Math.cos(skewX - skewY) + 0.5})`
    }

    e.target.addEventListener('mousemove', onMouseMove, false);

    setTimeout(() => {
      e.target.style.transform = ''
      document.body.style.cursor = 'default'
      e.target.classList.remove("saturate-200")
      document.body.style.filter = ''

      e.target.removeEventListener('mousemove', onMouseMove)
    }, 5000)
  }

  const onLongPress = (e: any) => {
    // console.log('longpress is triggered', e.target);
    // setlongPressCount(longPressCount + 1)
    bindElementToCursor(e)
  };

  const onClick = () => {
    // console.log('click is triggered')
    // setClickCount(clickCount + 1)
    // setlongPressCount(0)
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
      <div className='fixed bottom-5 right-5 z-50 grayscale hover:grayscale-0 duration-500 translate-x-0 hover:translate-x-0 translate-y-52 hover:translate-y-0'>
        <iframe title="Jelly Grooves" className="rounded-xl" src="https://open.spotify.com/embed/playlist/2WvKikeI3TfwsMBiNYQUjJ?utm_source=generator" width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>
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
              border-[1px]] transition duration-[0.75s]
              active:scale-x-[-0.8] active:scale-y-[0.8]
              active:skew-x-12 active:skew-y-12
              hover:rounded-t-md ${index % 2 ? 'hover:rounded-r-md active:rotate-0' : 'hover:rounded-l-md hover:rotate-6 active:-rotate-0'}
              animate-[spin_ease-in-out_infinite']
              ${index % 2 ? 'hover:-rotate-6 active:rotate-0' : 'hover:rotate-6 active:-rotate-0'}
              hover:scale-[1.75] hover:z-50 hover:!border-[0px]
              grayscale hover:grayscale-0
            `}
            key={imageKey(index)}
          >
            <img
              src={process.env.PUBLIC_URL + imagePath}
              alt={`image-${index}`}
              className={`
                transition-all duration-[2s] ease-[cubic-bezier(0.035,0.795,0.05,0.95)]
                hover:rounded-md hover:rounded-t-md
                ${index % 2 ? 'hover:rounded-r-md active:rotate-0' : 'hover:rounded-l-md hover:rotate-6 active:-rotate-0'}
                hover:translate-x-3 hover:-translate-y-3
                opacity-80 hover:opacity-100
                border-[1px] border-accent-s-900/80 
              `}
              fetchPriority={index < 16 ? 'high' : 'low'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
