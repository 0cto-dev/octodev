import { connectDB } from '@/lib/mongodb';
import User from '@/models/Users';
import getCourseName from '@/lib/getCourseName';
import coursesData from '@/data/courses.json';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

function normalizeCourseSlug(courseName: string) {
	if (!courseName || typeof courseName !== 'string') return '';

	try {
		const decoded = decodeURIComponent(courseName);
		return decoded
			.trim()
			.toLowerCase()
			.replace(/^\/+|\/+$/g, '');
	} catch {
		return courseName
			.trim()
			.toLowerCase()
			.replace(/^\/+|\/+$/g, '');
	}
}

export async function GET(req: NextRequest) {
	try {
		const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

		if (!token?.id && !token?.sub) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		await connectDB();

		const requesterId = String(token.id || token.sub);
		const requester = await User.findById(requesterId).select('role').lean();

		if (!requester || requester.role !== 'Contratante') {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
		}

		const validCourseSlugs = new Set(
			(coursesData || []).map(course => normalizeCourseSlug(getCourseName(course.nome))),
		);

		const students = await User.find({ role: 'Aluno' })
			.select('name email image bio linkedin github courses')
			.lean();

		const formattedStudents = students
			.map(student => {
				const completedCourses = Array.isArray((student as any).courses) ? (student as any).courses : [];

				const certificates = Array.from(
					new Set(
						completedCourses
							.filter((course: any) => Number(course?.progress) >= 100)
							.map((course: any) => normalizeCourseSlug(String(course?.courseName || '')))
							.filter((courseName: string) => validCourseSlugs.has(courseName)),
					),
				);

				return {
					name: (student as any).name,
					email: (student as any).email,
					image: (student as any).image,
					bio: (student as any).bio,
					linkedin: (student as any).linkedin,
					github: (student as any).github,
					certificates,
				};
			})
			.filter(student => student.certificates.length > 0);

		return NextResponse.json({ students: formattedStudents });
	} catch (error) {
		return NextResponse.json({ error: String(error) }, { status: 500 });
	}
}
