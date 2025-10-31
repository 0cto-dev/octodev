import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const course = searchParams.get('course')
  const codePath = searchParams.get('codePath')

  if (!course || !codePath) {
    return NextResponse.json({ error: 'Parâmetros inválidos' }, { status:200 })
  }

  const filePath = path.join(process.cwd(), "data", course, "pratica", "codes", codePath)

  try {
    const code = await fs.readFile(filePath, 'utf-8')
    return NextResponse.json([code ])
  } catch (_error) {
    return NextResponse.json({ error: 'Arquivo não encontrado' }, { status: 200 })
  }
}
