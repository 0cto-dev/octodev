import { NextResponse } from 'next/server';
import { WASI } from 'wasi';
import fs from 'fs';
import { join } from 'path';
import os from 'os';

export async function POST(req: Request) {
  const { code } = await req.json();

  const runWasi = async () => {
    const wasmPath = join(process.cwd(), 'modules/tenda.wasm');
    const wasmBuffer = fs.readFileSync(wasmPath);

    const stdoutPath = join(os.tmpdir(), `wasi_stdout_${Date.now()}.txt`);
    const stdoutFd = fs.openSync(stdoutPath, 'w+');

    const wasi = new WASI({
      args: ['tenda', code],
      env: {},
      stdin:42,
      version:'preview1',
      preopens: { '/': process.cwd() },
      stdout: stdoutFd,
    });

    const { instance } = await WebAssembly.instantiate(wasmBuffer, {
      wasi_snapshot_preview1: wasi.wasiImport,
    });

    wasi.start(instance); 

    fs.closeSync(stdoutFd);
    const output = fs.readFileSync(stdoutPath, 'utf-8');
    fs.unlinkSync(stdoutPath);
    return output.trim();
  };

  try {
    const result = await Promise.race([
      runWasi(),
      new Promise((_r, reject) =>
        setTimeout(() => {
          console.log("timeout")
          reject(new Error('timeout'))
        }, 2000)
      ),
    ]);

    return NextResponse.json({ output: result });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message });
  }
}
