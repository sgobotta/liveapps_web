import { ReactElement } from 'react';

export type ApplicationOption = {
  name: string;
  isSelected: boolean;
};

export default function ApplicationOptionComponent({
  name,
  isSelected,
}: ApplicationOption): ReactElement {
  return (
    <p
      className={`
      text-white
      transition duration-500
      ${isSelected ? 'underline' : ''}
    `}
    >
      {name}
      {isSelected && <span className="animate-ping">█</span>}
    </p>
  );
}
