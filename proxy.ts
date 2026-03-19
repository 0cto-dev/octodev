import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/Users';

export async function proxy(req: NextRequest) {
	const isVisitor = Boolean(req.cookies.get('visitor')?.value);
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	const isLoggedIn = Boolean(token?.sub || token?.id || token?.email);

	if (!isLoggedIn && !isVisitor) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	if (isVisitor) {
		return NextResponse.next();
	}

	await connectDB();

	const userId = typeof token?.id === 'string' ? token.id : typeof token?.sub === 'string' ? token.sub : undefined;
	const userEmail = typeof token?.email === 'string' ? token.email : undefined;
	const userFilter = userId ? { _id: userId } : { email: userEmail };
	const user = await User.findOne(userFilter).select('role').lean();

	if (!user?.role) {
		return NextResponse.redirect(new URL('/login/setup', req.url));
	}

	return NextResponse.next();
}

export const config = {
	// all pages except /login /api/auth/* and static files
	matcher: ['/((?!login|privacidade|termos|api/auth|_next/static|_next/image|images|favicon.ico).*)'],
};
