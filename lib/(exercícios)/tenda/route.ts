import { NextResponse } from 'next/server';
import { WASI } from 'wasi';
import fs from 'fs';
import { join } from 'path';
import os from 'os';

// const PROMPT_TERMINATOR = '\x04';

export async function POST(req: Request): Promise<Response> {
  const { code }: { code: string } = await req.json();

  return new Promise(async resolve => {
    const wasmPath = join(process.cwd(), 'modules/tenda.wasm');
    const wasmBuffer = fs.readFileSync(wasmPath);

    // Criar um arquivo temporário para capturar stdout
    const stdoutPath = join(os.tmpdir(), `wasi_stdout_${Date.now()}.txt`);
    const stdoutFd = fs.openSync(stdoutPath, 'w+');

    const wasi = new WASI({
      args: ['tenda', code],
      env: {},
      version: 'preview1',
      preopens: {
        '/': process.cwd(),
      },
      stdout: stdoutFd,
    });

    const importObject = { wasi_snapshot_preview1: wasi.wasiImport };

    try {
      const { instance } = await WebAssembly.instantiate(wasmBuffer, importObject);

      wasi.start(instance);

      fs.closeSync(stdoutFd); // fechar para garantir escrita completa

      // Ler o conteúdo do arquivo temporário
      const output = fs.readFileSync(stdoutPath, 'utf-8');

      // Deletar o arquivo temporário depois
      fs.unlinkSync(stdoutPath);

      resolve(
        NextResponse.json({
          output: output.trim(),
        })
      );
    } catch (error) {
      console.error('Error executing WASI module:', error);
      resolve(
        NextResponse.json({
          error: 'Failed to execute WASI module',
        })
      );
    }
  });
}