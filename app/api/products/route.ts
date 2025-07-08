import { type NextRequest, NextResponse } from "next/server"

// Simulação de banco de dados em memória (será substituído por banco real)
let products = [
  {
    id: "1",
    name: "Red Bull Energy Drink",
    price: 8.5,
    image: "/placeholder.svg?height=200&width=200",
    description: "Bebida energética original",
    category: "energetico",
    volume: "250ml",
    active: true,
  },
  // Mais produtos...
]

export async function GET() {
  try {
    return NextResponse.json({ products, success: true })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newProduct = {
      id: Date.now().toString(),
      ...body,
      active: true,
    }

    products.push(newProduct)

    return NextResponse.json({ product: newProduct, success: true })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    const productIndex = products.findIndex((p) => p.id === id)
    if (productIndex === -1) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 })
    }

    products[productIndex] = { ...products[productIndex], ...updateData }

    return NextResponse.json({ product: products[productIndex], success: true })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar produto" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID do produto é obrigatório" }, { status: 400 })
    }

    products = products.filter((p) => p.id !== id)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar produto" }, { status: 500 })
  }
}
