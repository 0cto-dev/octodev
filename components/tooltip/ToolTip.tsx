import * as React from "react";
import { Tooltip } from "radix-ui";
import "./ToolTip.css";

export default function ToolTip({children,text}:{text?:string,children:React.ReactElement}){
    if(!text || text.length===0) return null;
	return (
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<button className="IconButton">
						{children}
					</button>
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content className="TooltipContent" sideOffset={5}>
						{text}
						<Tooltip.Arrow className="TooltipArrow" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
};