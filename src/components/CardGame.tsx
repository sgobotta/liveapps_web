import React from 'react';
import useLongPress from '../hooks/useLongPress';
import { preventDefault } from '../utils';

type CardGameProps = {
  images: string[]
}

export default function CardGame(props: CardGameProps) {
  function imageKey(index: number) { return `image-${index}`}

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

  // ---------------------------------------------------------------------------
  // longPressEvent
  //
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
    <div className="
      grid
      gap-0 grow
      grid-rows-4 grid-cols-4
      sm:grid-rows-6 sm:grid-cols-6
      xl:grid-rows-9 xl:grid-cols-9
      2xl:grid-rows-12 2xl:grid-cols-12
    ">
      {props.images.map((imagePath: string, index: number) => (
        <div
          {...longPressEvent}
          onDragStart={preventDefault}
          onDrop={preventDefault}
          className={`
            border-[1px] border-zinc-600 transition duration-[0.75s]
            active:scale-x-[-0.8] active:scale-y-[0.8]
            active:skew-x-12 active:skew-y-12
            hover:rounded-t-md ${index % 2 ? 'hover:rounded-r-md active:rotate-0' : 'hover:rounded-l-md hover:rotate-6 active:-rotate-0'}
            ${index % 2 ? 'hover:-rotate-6 active:rotate-0' : 'hover:rotate-6 active:-rotate-0'}
            hover:scale-[1] hover:z-50 hover:border-dashed hover:border-zinc-300
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
  )
}