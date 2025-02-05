import { AppChoice } from '../../types';
import { AppSelectionOption } from '../../types/app-selection/AppSelectionOption';

export interface AppSelectionI {
  currentSelection: AppSelectionOption;
  chooseSelection: (option: AppChoice) => void;
  nextSelection: (option: AppSelectionOption) => void;
  previousSelection: (option: AppSelectionOption) => void;
}
