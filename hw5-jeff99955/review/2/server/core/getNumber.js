let number

const getNumber = (forceRestart = false) => {
	
	if (number === undefined || forceRestart)
		number = Math.floor(Math.random() * 101);	
	
	return number
}

export default getNumber
