import {createContext, FC, ReactNode, useState} from 'react';

type TMenuContext = {
	openedMenuId: number | null;
	openMenu: (id: number) => void;
	closeMenu: () => void;
}
const defaultState: TMenuContext = {
	openedMenuId: null,
	openMenu: () => {
	},
	closeMenu: () => {
	},
}

export const MenuContext = createContext<TMenuContext>(defaultState);

export const MenuProvider: FC<{children: ReactNode}> = ({children}) => {

	const [openedMenuId, setOpenedMenuId] = useState<typeof defaultState.openedMenuId>(defaultState.openedMenuId);

	const openMenu = (id: number) => setOpenedMenuId(id);

	const closeMenu = () => setOpenedMenuId(null);

	return <MenuContext.Provider value={{openedMenuId, openMenu, closeMenu}}>
		{children}
	</MenuContext.Provider>
}
