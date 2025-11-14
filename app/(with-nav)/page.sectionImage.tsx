import { courseType } from "@/types/types";

export default function CourseImage({ course }: { course: courseType }) {
	const src = `https://placehold.co/900x400/${course.cor.replace('#', '')}/f7f8ff?text=${encodeURIComponent(
		'Banner ' + course.nome
	)}`;
	return (
		<div className="image">
			<img src={src} alt={`${course.nome}Banner`} width={100} height={100} />
		</div>
	);
}
