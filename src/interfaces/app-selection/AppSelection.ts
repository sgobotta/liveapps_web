import { AppSelectionOption } from '../../types/app-selection/AppSelectionOption';

export interface AppSelectionI {
  nextSelection: () => AppSelectionOption;
  previousSelection: () => AppSelectionOption;
}
