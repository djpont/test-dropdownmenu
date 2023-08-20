// Метод генерации уникального id (простая альтернатива uuuid)
export const generateId = (() => {
	let index = 0;
	return () => ++index;
})();
