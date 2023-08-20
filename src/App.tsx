import React from 'react'
import {DropdownMenu, MenuProvider} from 'DropdownMenu';
import type {TMenuItems} from 'DropdownMenu';
import styles from './App.module.scss';

import {MenuSVG, ShareSVG, EditSVG, DeleteSVG} from './assets';

const menu: TMenuItems = [
	{text: 'Поделиться в социальных сетях', callback: () => console.log('Share'), Icon: ShareSVG},
	{text: 'Редактировать страницу', callback: () => console.log('Edit'), Icon: EditSVG},
	{text: 'Удалить страницу', callback: () => console.log('Delete'), Icon: DeleteSVG},
	{text: 'Пункт без каллбека'},
];

const Trigger = () => <button className={styles.button}><MenuSVG/></button>;
const text = Array(100).fill('много текста').join(' ');

const App = () => {

	return (
		<MenuProvider>
			<div className={styles.app}>
				<div className={styles.flex}>
					<DropdownMenu list={menu}><Trigger/></DropdownMenu>
					<DropdownMenu list={menu}><Trigger/></DropdownMenu>
				</div>
				<ul>
					<li>Открытие меню срабатывает при наведении курсора мышки или при клике по кнопке.</li>
					<li>Закрытие меню происходит при клике вне области меню или при открытии другого меню.</li>
					<li>Положение меню обновляется при скролле и при изменении размеров окна.</li>
					<li>Если передан каллбек, то он сработает при клике на пункте меню и меню закроется.</li>
					<li>Если каллбек не передан, то при клике меню не закроется.</li>
				</ul>
				<p>{text}</p>
				<div className={styles.flex}>
					<DropdownMenu list={menu}><Trigger/></DropdownMenu>
					<DropdownMenu list={menu}><Trigger/></DropdownMenu>
				</div>
				<p>{text}</p>
				<div className={styles.flex}>
					<DropdownMenu list={menu}><Trigger/></DropdownMenu>
					<DropdownMenu list={menu}><Trigger/></DropdownMenu>
				</div>
			</div>
		</MenuProvider>
	)
}

export default App
