import { atom } from 'recoil';

export const sidePanelCollapsedState = atom<boolean>({
  key: 'sidePanelCollapsedState',
  default: false,
});
