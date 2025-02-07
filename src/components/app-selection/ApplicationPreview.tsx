import { ReactElement } from 'react';

type ApplicationPreviewProps = {
  isSelected?: boolean;
  extraClasses?: string;
  previewContent?: ReactElement;
};

export function ApplicationPreview({
  extraClasses = '',
  previewContent,
}: ApplicationPreviewProps): ReactElement {
  return (
    <div className="absolute">
      <div className="relative p-10 w-full h-[80vh]">
        <div
          className={`
          absolute
          top-[12%] left-[-66%]
          sm:top-[24%] sm:left-[40%]
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
          top-[10%] left-[-50%]
          sm:top-[22%] sm:left-[70%]
          h-60 w-60 sm:h-72 sm:w-72 
          rounded-3xl
          blur-[0.05rem]
          transition duration-[1.25s]
          ${extraClasses}
          flex items-center justify-center
        `}
        >
          {previewContent}
        </div>
      </div>
    </div>
  );
}
