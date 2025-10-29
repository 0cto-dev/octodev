import { Dispatch, SetStateAction } from "react";

export default async function updateTimer(setSeconds: Dispatch<SetStateAction<number>>) {
	setTimeout(() => {
		// Atualiza o state seconds sempre que o valor atual de seconds não for falsy (0)
		setSeconds(seconds => (seconds ? seconds - 1 : seconds));
	}, 1000);
}
