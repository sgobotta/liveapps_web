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
      transition duration-500
      ${isSelected ? 'underline' : ''}
    `}
      onClick={onClick}
    >
      {name}
      {isSelected && <span className="animate-ping">█</span>}
    </p>
  );
}
