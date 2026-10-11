import { OnlineCompilerResponseType } from "@/types/types";

export default async function fetchResultPiston(code: string, language: string): Promise<OnlineCompilerResponseType> {
    const response = await fetch('/api/run-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
    });

    if (!response.ok) {
        throw new Error('Falha na comunicação com o servidor.');
    }

    const result = await response.json();
    return result;
}