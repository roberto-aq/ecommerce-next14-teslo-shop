import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface State {
	isSideMenuOpen: boolean;

	openSideMenu: () => void;
	closeSideMenu: () => void;
}

const storeApi: StateCreator<State> = set => ({
	isSideMenuOpen: false,

	openSideMenu: () => set({ isSideMenuOpen: true }),
	closeSideMenu: () => set({ isSideMenuOpen: false }),
});

export const useUIStore = create<State>()(devtools(storeApi));
