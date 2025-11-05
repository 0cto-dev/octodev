import { lessonType } from '@/types/types';
import Link from 'next/link';
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
	function handlePush() {
		window.location.href = `/${lesson.course}`;
	}
	return (
		<div className="left">
				<button className="exit" onClick={handlePush}>
					<FaArrowLeftLong size={20} />
				</button>
			<div className="description">
				<h1>{lesson.data.titulo}</h1>
				<p>{lesson.data.descricao}</p>
			</div>
		</div>
	);
}
