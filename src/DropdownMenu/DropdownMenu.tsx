import {FC, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';

import {MenuContext} from './context';
import {TDropdown} from './typing';
import {MenuWithRef} from './Menu';
import styles from './styles.module.scss';
import {generateId} from 'utils';

const DropdownMenu: FC<TDropdown> = ({list, children}) => {
	// Ref для триггерати блока меню
	const triggerRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	const [id] = useState(generateId()); // Уникальный ID экземпляра меню

	const {openedMenuId, openMenu, closeMenu} = useContext(MenuContext);

	const [isOpened, setIsOpened] = useState(false);
	const [dropToDown, setDropToDown] = useState<boolean>(true);
	const [dropToRight, setDropToRight] = useState<boolean>(true);
	const [isTriggerVisible, setIsTriggerVisible] = useState<boolean>(true);

	// Подписка на события при инициализации компонента
	useEffect(() => {
		// Клик по странице, если вне триггера и меню, то закрываем меню
		const documentClickHandler = (event: MouseEvent) => {
			if (!menuRef.current || !triggerRef.current) {
				return;
			}
			if (!(menuRef.current.contains(event.target as Node) || triggerRef.current.contains(event.target as Node))) {
				closeMenu();
			}
		};

		document.addEventListener('click', documentClickHandler);
		document.addEventListener('scroll', calculateDropWaysAndVisible)
		window.addEventListener('resize', calculateDropWaysAndVisible)

		return () => {
			document.removeEventListener('click', documentClickHandler);
			document.removeEventListener('scroll', calculateDropWaysAndVisible)
			window.removeEventListener('resize', calculateDropWaysAndVisible)
		};
	}, [closeMenu]);

	// При смене контекста обновляем isOpened
	useEffect(() => {
		setIsOpened(openedMenuId === id);
	}, [openedMenuId, id]);

	// Метод рассчетов в какую сторону разворачивать меню, и виден ли триггер
	const calculateDropWaysAndVisible = (): void => {
		if (!(triggerRef.current)) {
			return;
		}
		const triggerBox = triggerRef.current.getBoundingClientRect();
		setIsTriggerVisible(
			triggerBox.top < window.innerHeight
			&& triggerBox.bottom > 0
			&& triggerBox.right > 0
			&& triggerBox.left < window.innerWidth,
		);
		// Операции с menuRef описаны ниже, т.к. если меню закрыто, то menuRef.current отсутствует
		// В отдельный метод не вынес, так как для вычислений используется triggerRef
		if (!menuRef.current) {
			return;
		}
		const menuBox = menuRef.current.getBoundingClientRect();
		setDropToDown(triggerBox.bottom + menuBox.height < window.innerHeight);
		setDropToRight(triggerBox.left + menuBox.width < window.innerWidth);
	}

	useLayoutEffect(() => {
		calculateDropWaysAndVisible();
	}, [isOpened]);

	const triggerClickHandler = () => {
		isOpened ? closeMenu() : openMenu(id);
	}

	const triggerMouseEnterHandler = () => {
		openMenu(id);
	}

	return (
		<div className={styles.container}>
			<div
				ref={triggerRef}
				className={styles.trigger}
				onClick={triggerClickHandler}
				onMouseEnter={triggerMouseEnterHandler}
			>
				{children}
			</div>
			{isOpened && isTriggerVisible &&
				<MenuWithRef ref={menuRef} toDown={dropToDown} toRight={dropToRight} closeMenu={closeMenu}
							 list={list}/>}
		</div>);
}

export {DropdownMenu}
