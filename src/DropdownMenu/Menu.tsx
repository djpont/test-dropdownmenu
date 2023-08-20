import {forwardRef, ForwardRefRenderFunction} from 'react';
import {TMenu} from './typing';
import styles from './styles.module.scss';

const Menu: ForwardRefRenderFunction<HTMLDivElement, TMenu> = (
	{
		toDown = true,
		toRight = true,
		closeMenu,
		list,
	}, ref,
) => {

	// Стили для блока меню
	const getClassNames = (): string => {
		const classNames = [styles.menu];
		classNames.push(toDown ? styles.dropDown : styles.dropUp);
		classNames.push(toRight ? styles.dropRight : styles.dropLeft);
		return classNames.join(' ');
	}

	return <div ref={ref} className={getClassNames()}>
		<ul>
			{list.map(({text, callback, Icon}, key) => {
				const onClick = () => {
					if (callback) {
						callback();
						closeMenu();
					}
				}

				return <li key={key} onClick={onClick}>
					<span>{text}</span>
					<span>{Icon && <Icon/>}</span>
				</li>
			})}
		</ul>
	</div>
}
export const MenuWithRef = forwardRef(Menu);
