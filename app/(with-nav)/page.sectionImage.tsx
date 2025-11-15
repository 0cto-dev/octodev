import { courseType } from '@/types/types';
import Image from 'next/image';

export default function CourseImage({ course }: { course: courseType }) {
	const altSrc = `https://placehold.co/45x20/${course.cor.replace('#', '')}/f7f8ff?text=${encodeURIComponent(
		'Banner ' + course.nome
	)}`;
	return (
		<div className="image">
			{course.banner ? (
				<Image
					src={`/images/courseImages/${course.nome.toLowerCase()}Banner.jpeg`}
					height={200}
					loading='lazy'
					width={450}
					alt={`${course.nome}Banner`}
				/>
			) : (
				<img src={altSrc} alt={`${course.nome}Banner`} width={100} height={100} />
			)}
		</div>
	);
}
