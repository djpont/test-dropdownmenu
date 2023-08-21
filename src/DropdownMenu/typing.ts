import {FC, HTMLAttributes, ReactNode} from 'react';

// Тип элемента меню
type TMenuItem = {
	text: string;
	Icon?: FC;
	callback?: (...args: unknown[]) => unknown;
}

// Тип массива элементов меню
export type TMenuItems = TMenuItem[];

// Тип компонента триггера меню
export type TDropdown = {
	list: TMenuItems;
	children: ReactNode;
}

// Тип компонента самого меню
export type TMenu = {
	toDown: boolean;
	toRight: boolean;
	closeMenu: () => void;
	list: TMenuItems;
} & HTMLAttributes<HTMLDivElement>;
