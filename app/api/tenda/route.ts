import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";

const PROMPT_TERMINATOR = "\x04";

export async function POST(req: NextRequest): Promise<Response> {
  const { code }: { code: string } = await req.json();

  return new Promise<Response>((resolve) => { 
    const proc = spawn("wasmer", ["modules/tenda.wasm"], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    let output = "";
    let error = "";

    proc.stdout.on("data", (data) => {
      output += data.toString();
    });

    proc.stderr.on("data", (data) => {
      error += data.toString();
    });

    proc.on("close", (exitCode) => {
      resolve(
        NextResponse.json({
          output,
          error,
          exitCode,
        })
      );
    });

    proc.stdin.write(code + PROMPT_TERMINATOR);

    setTimeout(() => {
      proc.kill();
    }, 2000);

    proc.stdin.end();
  });
}
