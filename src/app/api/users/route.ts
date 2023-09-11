import { NextResponse } from 'next/server'

export async function GET() {
  const data = { status: 200, message: 'ok' }
 
  return NextResponse.json(data)
}
 
export async function POST(request: Request) {
  const body = await request.json()

  await new Promise(resolve => setTimeout(resolve, 5000))
  
  const data = { 
    status: 200, 
    message: 'Usuário criado com sucesso', 
    data: body 
  }
 
  return NextResponse.json(data)
}