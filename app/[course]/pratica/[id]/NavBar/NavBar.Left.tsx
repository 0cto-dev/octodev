import { lessonType } from '@/types/types';
import { useRouter } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';

export default function Left({
	lesson,
}: {
	lesson: {
		course: string;
		id: string;
		data: lessonType;
	};
}) {
	const router = useRouter();
	return (
		<div className="left">
			<button className="exit" onClick={() => router.push(`/${lesson.course}`)}>
				<FaArrowLeftLong size={20} />
			</button>
			<div className="description">
				<h1>{lesson.data.titulo}</h1>
				<p>{lesson.data.descricao}</p>
			</div>
		</div>
	);
}
