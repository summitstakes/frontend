import { Country, StateProvince } from '../../../lib/locationService';

export type ModalView = 'selection' | 'request' | 'request-success';

export interface LocationFormProps {
  onClose: () => void;
  currentLocation: string;
  setView: (view: ModalView) => void;
}

export interface RequestFormProps {
  view: ModalView;
  onClose: () => void;
  setView: (view: ModalView) => void;
}

export interface ConfirmationScreenProps {
  selectedCountry: Country | null;
  selectedStateOrProvince: StateProvince | null;
  onClose: () => void;
  onConfirm: () => void;
  onReset: () => void;
}