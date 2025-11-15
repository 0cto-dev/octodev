import { courseType } from '@/types/types';
import Image from 'next/image';

export default function CourseImage({ course }: { course: courseType }) {
	const src = `https://placehold.co/900x400/${course.cor.replace('#', '')}/f7f8ff?text=${encodeURIComponent(
		'Banner ' + course.nome
	)}`;
	return (
		<div className="image">
			{course.banner ? (
				<Image
					src={`/images/courseImages/${course.nome.toLowerCase()}Banner.jpeg`}
					height={400}
					loading='lazy'
					width={900}
					alt={`${course.nome}Banner`}
				/>
			) : (
				<img src={src} alt={`${course.nome}Banner`} width={100} height={100} />
			)}
		</div>
	);
}
