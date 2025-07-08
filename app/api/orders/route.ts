import { type NextRequest, NextResponse } from "next/server"

// Simulação de banco de dados para pedidos
const orders = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newOrder = {
      id: Date.now().toString(),
      ...body,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    orders.push(newOrder)

    // Aqui você pode integrar com WhatsApp Business API
    // ou outros sistemas de notificação

    return NextResponse.json({ order: newOrder, success: true })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar pedido" }, { status: 500 })
  }
}

export async function GET() {
  try {
    return NextResponse.json({ orders, success: true })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar pedidos" }, { status: 500 })
  }
}
