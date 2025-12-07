import { useIsMobile } from "@/lib/isMobile";
import { currentDate } from "@/types/types";
import { useSession } from "next-auth/react";
import { HiMiniFire } from "react-icons/hi2";

export function Streak() {
	const { data: session } = useSession();
	const isLastLessonToday = ((session?.user?.lastLessonDate || '') === currentDate) as boolean;
	const svgSize = useIsMobile()?25:30;

	return (
		<li id="streak" className={isLastLessonToday ? 'active' : ''}>
			<p>{session?.user?.streak}</p>
			<svg width={svgSize} height={svgSize}>
				<linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
					<stop stopColor="var(--yellow)" offset="30%" />
					<stop stopColor="var(--orange)" offset="40%" />
					<stop stopColor="var(--red)" offset="90%" />
				</linearGradient>
				<HiMiniFire style={isLastLessonToday ? { fill: 'url(#blue-gradient)' } : {}} size={svgSize} />
			</svg>
		</li>
	);
}
