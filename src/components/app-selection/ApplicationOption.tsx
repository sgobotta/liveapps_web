import { ReactElement } from 'react';

export type ApplicationOption = {
  isSelected: boolean;
  name: string;
  onClick: () => void;
};

export default function ApplicationOptionComponent({
  isSelected,
  name,
  onClick,
}: ApplicationOption): ReactElement {
  return (
    <p
      className={`
      text-white
      text-2xl
      transition duration-500
      ${isSelected ? 'underline text-sky-200 scale-125' : ''}
      hover:text-sky-300
      hover:cursor-pointer
    `}
      onClick={onClick}
    >
      {name}
      {isSelected && <span className="animate-ping">█</span>}
    </p>
  );
}
