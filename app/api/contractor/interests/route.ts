import { connectDB } from '@/lib/mongodb';
import User from '@/models/Users';
import getCourseName from '@/lib/getCourseName';
import coursesData from '@/data/courses.json';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

function normalizeCourseName(courseName: string) {
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

const validCourseNames = new Set((coursesData || []).map(course => normalizeCourseName(getCourseName(course.nome))));

async function getContractorUser(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	if (!token?.id && !token?.sub) return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };

	await connectDB();

	const requesterId = String(token.id || token.sub);
	const user = await User.findById(requesterId);

	if (!user || user.role !== 'Contratante') {
		return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
	}

	return { user };
}

export async function GET(req: NextRequest) {
	try {
		const result = await getContractorUser(req);
		if ('error' in result) return result.error;

		const interests = Array.isArray(result.user.contractorInterests)
			? result.user.contractorInterests.filter((interest: string) =>
					validCourseNames.has(normalizeCourseName(interest)),
				)
			: [];

		return NextResponse.json({ interests });
	} catch (error) {
		return NextResponse.json({ error: String(error) }, { status: 500 });
	}
}

export async function PUT(req: NextRequest) {
	try {
		const result = await getContractorUser(req);
		if ('error' in result) return result.error;

		const body: { interests?: unknown } = await req.json();
		const rawInterests: string[] = Array.isArray(body?.interests)
			? body.interests.filter((interest: unknown): interest is string => typeof interest === 'string')
			: [];

		const normalizedInterests: string[] = rawInterests
			.map(interest => normalizeCourseName(interest))
			.filter((interest: string) => validCourseNames.has(interest));

		const interests: string[] = [...new Set(normalizedInterests)];

		result.user.contractorInterests = interests;
		await result.user.save();

		return NextResponse.json({ success: true, interests });
	} catch (error) {
		return NextResponse.json({ error: String(error) }, { status: 500 });
	}
}
