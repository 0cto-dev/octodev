export default function verifyHardCode(code:string,regex:string):boolean{
	if(!regex) return true;
	const regexHardCode = new RegExp(regex);

	return !regexHardCode.test(code)
}
