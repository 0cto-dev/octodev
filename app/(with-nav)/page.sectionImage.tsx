'use client'
import { courseType } from '@/types/types';
import Image from 'next/image';

export default function CourseImage({ course }: { course: courseType }) {
	const altSrc = `https://placehold.co/45x20/${course.cor.replace('#', '')}/f7f8ff?text=${encodeURIComponent(
		'Banner ' + course.nome
	)}`;
	console.log(`/images/courseImages/${course.banner}`)
	return (
		<div className="image">
			{course.banner ? (
				<Image
					src={`/images/courseImages/${course.banner}`}
					height={200}
					width={450}
					loading='lazy'
					alt={`${course.banner}`}
				/>
			) : (
				<img src={altSrc} alt={`${course.nome}Banner`} width={100} height={100} />
			)}
		</div>
	);
}
