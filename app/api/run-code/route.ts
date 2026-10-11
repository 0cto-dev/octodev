import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { code, language } = await request.json();

        const response = await fetch('https://api.onlinecompiler.io/api/run-code-sync/', {
            method: 'POST',
            headers: {
                Authorization: process.env.ONLINE_COMPILER_API_KEY || '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                compiler: language === 'python' ? 'python-3.14' : language,
                code,
                input: 'World',
            }),
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao executar o código' }, { status: 500 });
    }
}