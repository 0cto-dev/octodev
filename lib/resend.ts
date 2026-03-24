type SendCourseCompletedEmailParams = {
	to: string;
	contractorName?: string;
	studentName: string;
	studentEmail: string;
	courseDisplayName: string;
};

export async function sendCourseCompletedEmail({
	to,
	contractorName,
	studentName,
	studentEmail,
	courseDisplayName,
}: SendCourseCompletedEmailParams) {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) return { sent: false, reason: 'missing_api_key' } as const;

	const from = process.env.RESEND_FROM_EMAIL || 'OctoDev <onboarding@resend.dev>';
	const appUrl = process.env.NEXTAUTH_URL || '';
	const contractorGreeting = contractorName ? `Olá, ${contractorName}!` : 'Olá!';

	const subject = `Um Aluno terminou um curso de seu interesse: ${courseDisplayName}`;
	const text = `${contractorGreeting}\n\nUm aluno concluiu 100% de um curso do seu interesse na OctoDev.\n\nAluno: ${studentName}\nEmail: ${studentEmail}\nCurso: ${courseDisplayName}${appUrl ? `\n\nVer na plataforma: ${appUrl}` : ''}`;
	const html = `
		<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f6f4ff;padding:24px 0;font-family:Arial,sans-serif;">
			<tr>
				<td align="center">
					<table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;background:#ffffff;border:1px solid #e7ddff;border-radius:16px;overflow:hidden;">
						<tr>
							<td style="background:linear-gradient(135deg,#6f3cff,#8f65ff);padding:20px 24px;">
								<p style="margin:0;color:#efe8ff;font-size:12px;letter-spacing:1px;font-weight:700;">OCTODEV • ALERTA DE TALENTO</p>
								<h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;line-height:1.25;">Novo aluno concluiu um curso de interesse</h1>
							</td>
						</tr>
						<tr>
							<td style="padding:22px 24px 8px;color:#2a1f4a;font-size:16px;line-height:1.6;">
								<p style="margin:0 0 12px;"><strong>${contractorGreeting}</strong></p>
								<p style="margin:0;">Um aluno concluiu <strong>100%</strong> de um curso que está nos seus interesses.</p>
							</td>
						</tr>
						<tr>
							<td style="padding:8px 24px 20px;">
								<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f7f2ff;border:1px solid #e6d9ff;border-radius:12px;">
									<tr>
										<td style="padding:14px 16px;color:#3a2a63;font-size:14px;line-height:1.7;">
											<p style="margin:0 0 4px;"><strong>Aluno:</strong> ${studentName}</p>
											<p style="margin:0 0 4px;"><strong>Email:</strong> ${studentEmail}</p>
											<p style="margin:0;"><strong>Curso concluído:</strong> <span style="color:#6f3cff;font-weight:700;">${courseDisplayName}</span></p>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						${
							appUrl
								? `<tr>
									<td align="center" style="padding:4px 24px 26px;">
										<a href="${appUrl}" target="_blank" rel="noreferrer" style="display:inline-block;background:#6f3cff;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:10px;font-size:14px;font-weight:700;">Ver na plataforma</a>
									</td>
								</tr>`
								: ''
						}
						<tr>
							<td style="padding:0 24px 18px;color:#8b7bb8;font-size:12px;line-height:1.5;">
								<p style="margin:0;">Você recebeu este aviso porque marcou este curso como interesse no painel de contratante.</p>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	`;

	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			from,
			to,
			subject,
			text,
			html,
		}),
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Resend error (${response.status}): ${errorText}`);
	}

	return { sent: true } as const;
}
