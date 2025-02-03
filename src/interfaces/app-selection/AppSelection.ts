import { AppSelectionOption } from '../../types/app-selection/AppSelectionOption';

export interface AppSelectionI {
  nextSelection: (option: AppSelectionOption) => void;
  previousSelection: (option: AppSelectionOption) => void;
  currentSelection: AppSelectionOption;
}
