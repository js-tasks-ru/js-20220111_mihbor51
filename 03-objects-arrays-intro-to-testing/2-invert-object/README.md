# invertObj

Необходимо реализовать функцию, которая меняет местами ключи и значения в объекте.
Функция принимает объект, свойства которого могут быть только примитивными значениями, 
а возвращает новый объект, где ключи и свойства заменены между собой местами. 

**Пример:**
```javascript
const obj = { key: 'value' };

const invertObj = (obj) => {
const obj2 = {...obj}
	return Object.entries(obj2).reduce((acc, el) => {
  	    return {...acc, [el[1]]: el[0]}
  }, {})
}

console.log(invertObj(obj)); // { value: 'key'}
```
