import { AppSelectionOption } from '../../types/app-selection/AppSelectionOption';

export interface AppSelectionI {
  currentSelection: AppSelectionOption;
  chooseSelection: (option: AppSelectionOption) => void;
  nextSelection: (option: AppSelectionOption) => void;
  previousSelection: (option: AppSelectionOption) => void;
  selections: AppSelectionOption[];
}
