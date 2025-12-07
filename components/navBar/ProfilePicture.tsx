import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Menu } from "./Menu";
import Image from "next/image";

export default function ProfilePicture() {
    const [menuOpen, setMenuOpen] = useState<string | boolean>('');
    const { data: session } = useSession();
    
	function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
		const target = e.target as HTMLElement;

		if (target.closest('#pfp>a') || target.closest('.menu>ul>li')) setMenuOpen(menuOpen => !menuOpen);
	}
	return (
		<li id="pfp" onClick={handleClick} className={`${menuOpen ? 'open' : ''}`}>
			<a href="#">
				{session?.user.image ? (
					<Image src={session.user.image} width={35} height={35} alt="pfp" />
				) : (
					<FaUserCircle size={35} />
				)}
			</a>
			<div className={`menu ${menuOpen === '' ? '' : menuOpen ? 'open' : 'close'}`}>
				<ul>
					<Menu />
				</ul>
			</div>
		</li>
	);
}
