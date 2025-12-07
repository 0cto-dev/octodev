import { currentDate } from "@/types/types";
import { useSession } from "next-auth/react";
import { HiMiniFire } from "react-icons/hi2";

export function Streak() {
	const { data: session } = useSession();
	const isLastLessonToday = ((session?.user?.lastLessonDate || '') === currentDate) as boolean;
	return (
		<li id="streak" className={isLastLessonToday ? 'active' : ''}>
			<p>{session?.user?.streak}</p>
			<svg width="30" height="30">
				<linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
					<stop stopColor="var(--yellow)" offset="30%" />
					<stop stopColor="var(--orange)" offset="40%" />
					<stop stopColor="var(--red)" offset="90%" />
				</linearGradient>
				<HiMiniFire style={isLastLessonToday ? { fill: 'url(#blue-gradient)' } : {}} size={30} />
			</svg>
		</li>
	);
}
