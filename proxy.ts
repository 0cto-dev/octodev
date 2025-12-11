import { NextRequest, NextResponse } from 'next/server';
import Cookies from 'js-cookie';

// check nextauth
import { getServerSession } from 'next-auth/next';
export async function proxy(req: NextRequest) {
    const session = await getServerSession();
	const isLoggedIn = (session?.user ? true : false)
	const isVisitor = req.cookies.get('visitor') ? true : false;
	
    const connected = isLoggedIn||isVisitor;
    

	if (!connected) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	return NextResponse.next();
}

export const config = {
	// all pages except /login /api/auth/* and static files
	matcher: ['/((?!login|privacidade|termos|api/auth|_next/static|_next/image|images|favicon.ico).*)'],
};
