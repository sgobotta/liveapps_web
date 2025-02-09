import { AppChoice } from './AppChoice';

export type AppSelectionOption = {
  choice: AppChoice;
  name: string;
  index?: number;
  onSelect: () => void;
};
