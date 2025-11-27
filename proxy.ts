import { NextRequest, NextResponse } from 'next/server';
// check nextauth
import { getServerSession } from 'next-auth/next';
export async function proxy(req: NextRequest) {
    const session = await getServerSession();
    const connected = session?.user ? true : false;
    

	if (!connected) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	return NextResponse.next();
}

export const config = {
	// all pages except /login /api/auth/* and static files
	matcher: ['/((?!login|privacidade|termos|api/auth|_next/static|_next/image|\.png|\.jpg|\.jpeg|\.gif|\.svg|favicon.ico).*)'],
};
