export default function ProgressBarComp({
	progress,
	from = 'var(--primary)',
	to = 'color-mix(in srgb, var(--accent) 80% ,var(--primary))',
}: {
	progress: number;
	from?: string;
	to?: string;
}) {
	return (
		<div
			className="progress-bar"
			/* create am gradient effect on progress bar */
			style={{
				background: `
                        linear-gradient(
                            90deg,
                            ${from}, 
                            ${to} 
                        ),
                        var(--input)
                        `,
				backgroundSize: `${progress}% 100%, 100% 100%`,
				backgroundRepeat: 'no-repeat',
			}}
		></div>
	);
}
