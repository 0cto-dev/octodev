'use client';
import getCourses from '@/lib/readCoursesNames';
import { useEffect, useState } from 'react';
import './page.css'

export default function Home() {
	// #region States
	const [courses, setCourses] = useState<string[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	// #endregion

	// #region Effects
	useEffect(() => {
		getCourses(setCourses, setIsLoaded);
		console.log(courses);
	}, []);
	// #endregion
	
	return (
		isLoaded && (
			<main>
				<header>
					<ul>
						<li>OctoDev</li>
						<li>ProfilePicture</li>
					</ul>
				</header>
				<section>
					<div>
						curso1
					</div>
					<div>
						curso2
					</div>
				</section>
				<footer>footer</footer>
			</main>
		)
	);
}
