import Image from "next/image";
import iconImage from '@/public/images/octoSemFundo.png';
import { useIsMobile } from "@/lib/isMobile";

export default function OctoDevLogo() {
    const octoSize = useIsMobile()?35:40
	return (
		<li id="octo">
			<a href="/">
				<div className="blur"></div>
				<Image src={iconImage} alt="logo" loading="eager" width={octoSize} height={octoSize}></Image>
			</a>
		</li>
	);
}
