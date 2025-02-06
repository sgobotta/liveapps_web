import { ReactElement } from 'react';

type ApplicationPreviewProps = {
  isSelected?: boolean;
  extraClasses?: string;
};

export function ApplicationPreview({
  extraClasses = '',
}: ApplicationPreviewProps): ReactElement {
  return (
    <div className="absolute">
      <div className="relative p-10 w-full h-[80vh]">
        <div
          className={`
          absolute
          top-[12%] left-[-16%]
          sm:top-[50%] sm:left-[40%]
          h-60 !w-screen
          sm:h-72 sm:w-72 
          rounded-3xl
          transition duration-[1s]
          ${extraClasses}
          bg-opacity-20
          blur-[2px]
        `}
        />
        <div
          className={`
          absolute
          top-[10%] left-[0%]
          sm:top-[48%] sm:left-[70%]
          h-60 w-60 sm:h-72 sm:w-72 
          rounded-3xl
          blur-[0.05rem]
          transition duration-[1.25s]
          ${extraClasses}
        `}
        >
          <p className="text-white"></p>
        </div>
      </div>
    </div>
  );
}
