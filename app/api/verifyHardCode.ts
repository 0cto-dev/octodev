export default function verifyHardCode(code:string,regex:string):boolean{
	if(!regex) return false;
	const regexHardCode = new RegExp(regex);

	return !regexHardCode.test(code)
}
