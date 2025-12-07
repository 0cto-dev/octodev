import hljs from "highlight.js";
import { useEffect, useRef } from "react";

export function CodeBlock({ language, children }: { language: string; children: string[] }) {
	const codeRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (codeRef.current) {
			delete codeRef.current.dataset.highlighted;
			hljs.highlightElement(codeRef.current);
		}
	}, [children]);
	return (
		<pre className="code">
			<code className={language} ref={codeRef}>
				{children[0]}
			</code>
		</pre>
	);
}