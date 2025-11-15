'use client'

import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import './NavBar.css';

export default function NavBar() {
    function handleClick(e: React.MouseEvent<HTMLLIElement>) {
        location.href = '/placar';	
    }
    return (
        <>
            <header>
                <ul>
                    <li id="octo">
                        <a href="/">
                            <div className="blur"></div>
                            <Image src={'/images/octoSemFundo.png'} alt="logo" loading='eager' width={40} height={40}></Image>
                        </a>
                    </li>
                    <li id='leaderboard' onClick={handleClick}>
                        <p>Placar de Lideres</p>
                    </li>
                    <li id="pfp">
                        <a href="#">
                            <FaUserCircle size={35} />
                        </a>
                    </li>
                </ul>
            </header>
        </>
    );
}