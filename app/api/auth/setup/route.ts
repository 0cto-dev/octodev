import { connectDB } from '@/lib/mongodb';
import { authOptions } from '@/lib/auth';
import User from '@/models/Users';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { SetupPayload } from '@/types/types';

export async function POST(req: Request) {
	try {
		const session = await getServerSession(authOptions);
		const sessionUserId = session?.user?.id;
		const sessionUserEmail = session?.user?.email?.trim();

		if (!sessionUserId && !sessionUserEmail) {
			return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
		}

		const body = (await req.json()) as SetupPayload;

		if (!body.role) {
			return NextResponse.json({ error: 'Selecione um perfil' }, { status: 400 });
		}

		if (!body.nickname?.trim() || !body.email?.trim()) {
			return NextResponse.json({ error: 'Apelido e email são obrigatórios' }, { status: 400 });
		}

		const updateData: Record<string, string> = {
			role: body.role,
			nickname: body.nickname.trim(),
			email: body.email.trim(),
			linkedin: '',
			github: '',
			bio: '',
			empresa: '',
			descricaoContratante: '',
		};

		if (body.role === 'Aluno') {
			updateData.linkedin = body.linkedin?.trim() ?? '';
			updateData.github = body.github?.trim() ?? '';
			updateData.bio = body.bio?.trim() ?? '';
		}

		if (body.role === 'Contratante') {
			updateData.empresa = body.empresa?.trim() ?? '';
			updateData.descricaoContratante = body.descricaoContratante?.trim() ?? '';
		}

		await connectDB();

		const userFilter = sessionUserId ? { _id: sessionUserId } : { email: sessionUserEmail };

		const updatedUser = await User.findOneAndUpdate(userFilter, { $set: updateData }, { new: true });

		if (!updatedUser) {
			return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: String(error) }, { status: 500 });
	}
}
