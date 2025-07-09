"use client"

import { useState } from "react"
import { ShoppingCart, Plus, Minus, Calculator, MapPin, Phone, Mail, Clock } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
  volume?: string
  alcohol?: string
  brand?: string
  flavor?: string
}

interface CartItem extends Product {
  quantity: number
}

const products: Product[] = [
  // Energéticos
  {
    id: "1",
    name: "Red Bull Energy Drink",
    price: 8.5,
    image: "/placeholder.svg?height=200&width=200",
    description: "Bebida energética original",
    category: "energetico",
    volume: "250ml",
  },
  {
    id: "2",
    name: "Monster Energy",
    price: 9.9,
    image: "/placeholder.svg?height=200&width=200",
    description: "Energia extrema para momentos intensos",
    category: "energetico",
    volume: "473ml",
  },
  {
    id: "3",
    name: "TNT Energy Drink",
    price: 6.5,
    image: "/placeholder.svg?height=200&width=200",
    description: "Explosão de energia",
    category: "energetico",
    volume: "269ml",
  },
  // Whisky
  {
    id: "4",
    name: "Johnnie Walker Red Label",
    price: 89.9,
    image: "/placeholder.svg?height=200&width=200",
    description: "Whisky escocês blended",
    category: "whisky",
    volume: "1L",
    alcohol: "40%",
  },
  {
    id: "5",
    name: "Jack Daniel's",
    price: 159.9,
    image: "/placeholder.svg?height=200&width=200",
    description: "Tennessee Whiskey premium",
    category: "whisky",
    volume: "1L",
    alcohol: "40%",
  },
  // Vodka
  {
    id: "6",
    name: "Smirnoff Red",
    price: 45.9,
    image: "/placeholder.svg?height=200&width=200",
    description: "Vodka premium triple destilada",
    category: "vodka",
    volume: "998ml",
    alcohol: "37.5%",
  },
  {
    id: "7",
    name: "Absolut Original",
    price: 79.9,
    image: "/placeholder.svg?height=200&width=200",
    description: "Vodka sueca premium",
    category: "vodka",
    volume: "1L",
    alcohol: "40%",
  },
  // Gin
  {
    id: "8",
    name: "Bombay Sapphire",
    price: 89.9,
    image: "/placeholder.svg?height=200&width=200",
    description: "Gin London Dry premium",
    category: "gin",
    volume: "750ml",
    alcohol: "40%",
  },
  {
    id: "9",
    name: "Tanqueray",
    price: 79.9,
    image: "/placeholder.svg?height=200&width=200",
    description: "Gin clássico inglês",
    category: "gin",
    volume: "750ml",
    alcohol: "43.1%",
  },
  // Cerveja
  {
    id: "10",
    name: "Heineken Long Neck",
    price: 4.5,
    image: "/placeholder.svg?height=200&width=200",
    description: "Cerveja premium holandesa",
    category: "cerveja",
    volume: "330ml",
    alcohol: "5%",
  },
  {
    id: "11",
    name: "Corona Extra",
    price: 5.9,
    image: "/placeholder.svg?height=200&width=200",
    description: "Cerveja mexicana refrescante",
    category: "cerveja",
    volume: "355ml",
    alcohol: "4.6%",
  },
  // Essências
  {
    id: "12",
    name: "Essência Adalya Love 66",
    price: 25.0,
    image: "/placeholder.svg?height=200&width=200",
    description: "Essência premium com aroma frutado",
    category: "essencias",
    volume: "50g",
    brand: "Adalya",
    flavor: "Love 66",
  },
  {
    id: "13",
    name: "Essência Al Fakher Uva",
    price: 22.0,
    image: "/placeholder.svg?height=200&width=200",
    description: "Sabor clássico de uva doce",
    category: "essencias",
    volume: "50g",
    brand: "Al Fakher",
    flavor: "Uva",
  },
  // Carvão
  {
    id: "14",
    name: "Carvão Coconara",
    price: 18.0,
    image: "/placeholder.svg?height=200&width=200",
    description: "Carvão natural de coco premium",
    category: "carvao",
    volume: "1kg",
    brand: "Coconara",
  },
  {
    id: "15",
    name: "Carvão Three Kings",
    price: 15.0,
    image: "/placeholder.svg?height=200&width=200",
    description: "Carvão de acendimento rápido",
    category: "carvao",
    volume: "33mm",
    brand: "Three Kings",
  },
  // Diversos
  {
    id: "16",
    name: "Piteira de Vidro",
    price: 12.0,
    image: "/placeholder.svg?height=200&width=200",
    description: "Piteira de vidro borosilicato",
    category: "diversos",
    brand: "Premium Glass",
  },
  {
    id: "17",
    name: "Papel de Seda OCB",
    price: 3.5,
    image: "/placeholder.svg?height=200&width=200",
    description: "Papel de seda premium francês",
    category: "diversos",
    brand: "OCB",
  },
]

const sendWhatsAppOrder = (cart: CartItem[], frete: number | null) => {
  const phoneNumber = "5511948174784"

  let message = "🛒 *NOVO PEDIDO - Adega e Tabacaria Andrade*\n\n"
  message += "📋 *ITENS DO PEDIDO:*\n"

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`
    message += `   Qtd: ${item.quantity}x\n`
    message += `   Valor: R$ ${(item.price * item.quantity).toFixed(2)}\n\n`
  })

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  message += `💰 *RESUMO DO PEDIDO:*\n`
  message += `Subtotal: R$ ${subtotal.toFixed(2)}\n`

  if (frete !== null) {
    message += `Frete: R$ ${frete.toFixed(2)}\n`
    message += `*Total: R$ ${(subtotal + frete).toFixed(2)}*\n\n`
  } else {
    message += `*Total: R$ ${subtotal.toFixed(2)}*\n\n`
  }

  message += "📍 *Próximos passos:*\n"
  message += "• Confirme seu endereço de entrega\n"
  message += "• Escolha a forma de pagamento\n"
  message += "• Aguarde a confirmação do pedido\n\n"
  message += "Obrigado por escolher a Adega e Tabacaria Andrade! 🍷"

  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  window.open(whatsappUrl, "_blank")
}

export default function AdegaCardapio() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("energetico")
  const [cep, setCep] = useState("")
  const [frete, setFrete] = useState<number | null>(null)
  const [regiao, setRegiao] = useState<string | null>(null)
  const [showCart, setShowCart] = useState(false)

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId)
      if (existing && existing.quantity > 1) {
        return prev.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
      }
      return prev.filter((item) => item.id !== productId)
    })
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const calculateFrete = () => {
    if (cep.length === 8) {
      const regioesFrete: Record<string, { valor: number; nome: string }> = {
        "02201": { valor: 5.0, nome: "Tucuruvi" },
        "02202": { valor: 5.0, nome: "Tucuruvi" },
        "02203": { valor: 5.0, nome: "Tucuruvi" },
        "02216": { valor: 7.0, nome: "Vila Medeiros" },
        "02217": { valor: 7.0, nome: "Vila Medeiros" },
        "02218": { valor: 7.0, nome: "Vila Medeiros" },
        "02401": { valor: 15.0, nome: "Santana" },
        "02402": { valor: 15.0, nome: "Santana" },
        "02403": { valor: 15.0, nome: "Santana" },
      }

      const cepRegiao = cep.substring(0, 5)

      if (regioesFrete[cepRegiao]) {
        setFrete(regioesFrete[cepRegiao].valor)
        setRegiao(regioesFrete[cepRegiao].nome)
      } else {
        setFrete(20.0)
        setRegiao("Outras regiões")
      }
    }
  }

  const categories = [
    { id: "energetico", name: "Energéticos", icon: "⚡" },
    { id: "whisky", name: "Whisky", icon: "🥃" },
    { id: "vodka", name: "Vodka", icon: "🍸" },
    { id: "gin", name: "Gin", icon: "🍹" },
    { id: "cerveja", name: "Cerveja", icon: "🍺" },
    { id: "essencias", name: "Essências", icon: "🌿" },
    { id: "carvao", name: "Carvão", icon: "🔥" },
    { id: "diversos", name: "Diversos", icon: "🛍️" },
  ]

  const filteredProducts = products.filter((product) => product.category === selectedCategory)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-lg">A</span>
                </div>
                <div>
                  <h1 className="text-lg lg:text-xl xl:text-2xl font-bold text-yellow-400">
                    <span className="hidden sm:inline">Adega e Tabacaria Andrade</span>
                    <span className="sm:hidden">Adega Andrade</span>
                  </h1>
                  <p className="text-xs text-gray-400 hidden md:block">Qualidade e tradição desde 2009</p>
                </div>
              </div>
            </div>

            {/* Cart Button */}
            <Button
              variant="outline"
              size="icon"
              className="relative border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black h-9 w-9 lg:h-10 lg:w-10 bg-transparent"
              onClick={() => setShowCart(!showCart)}
            >
              <ShoppingCart className="h-4 w-4" />
              {getCartItemsCount() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-yellow-400 text-black text-xs">
                  {getCartItemsCount()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 lg:py-20 px-4 text-center bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-bold mb-4 lg:mb-6">
            Bem-vindo à <span className="text-yellow-400">Adega e Tabacaria Andrade</span>
          </h2>
          <p className="text-base lg:text-xl text-gray-300 mb-6 lg:mb-8 max-w-2xl mx-auto px-4">
            As melhores bebidas e produtos para tabacaria com entrega rápida e segura. Qualidade premium ao seu alcance.
          </p>
          <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold">
            Ver Cardápio
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 text-yellow-400">Nosso Cardápio</h2>

          {/* Category Tabs */}
          <div className="overflow-x-auto mb-8">
            <div className="flex space-x-2 min-w-max pb-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`${
                    selectedCategory === category.id
                      ? "bg-yellow-400 text-black"
                      : "border-gray-600 text-gray-300 hover:bg-gray-700"
                  } whitespace-nowrap`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-gray-900 border-gray-800 hover:border-yellow-400 transition-colors">
                <CardHeader className="p-3 lg:p-4">
                  <div className="aspect-square relative mb-3 lg:mb-4 bg-gray-800 rounded-lg overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <CardTitle className="text-white text-base lg:text-lg line-clamp-2">{product.name}</CardTitle>
                  <CardDescription className="text-gray-400 text-sm line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3 lg:p-4 pt-0">
                  <div className="flex items-center justify-between mb-3 lg:mb-4">
                    <div className="space-y-1">
                      <p className="text-xl lg:text-2xl font-bold text-yellow-400">R$ {product.price.toFixed(2)}</p>
                      <div className="flex flex-wrap gap-1 lg:gap-2">
                        {product.volume && (
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {product.volume}
                          </Badge>
                        )}
                        {product.alcohol && (
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {product.alcohol}
                          </Badge>
                        )}
                        {product.brand && (
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {product.brand}
                          </Badge>
                        )}
                        {product.flavor && (
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {product.flavor}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => addToCart(product)}
                    className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-bold text-sm lg:text-base h-9 lg:h-10"
                  >
                    <Plus className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                    Adicionar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowCart(false)}>
          <div
            className="fixed right-0 top-0 h-full w-[90vw] sm:w-[400px] bg-black border-l border-gray-800 text-white flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-800 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-yellow-400">Carrinho de Compras</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowCart(false)}>
                  <Plus className="h-4 w-4 rotate-45" />
                </Button>
              </div>
              <p className="text-gray-400 text-sm">Revise seus itens antes de finalizar</p>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              {cart.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-gray-400 text-center">Carrinho vazio</p>
                </div>
              ) : (
                <>
                  {/* Lista de produtos */}
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 border border-gray-800 rounded-lg"
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{item.name}</h4>
                            <p className="text-yellow-400 font-bold text-sm">R$ {item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center space-x-2 ml-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 border-green-500 text-green-500 hover:bg-green-500 hover:text-white bg-transparent"
                              onClick={() => addToCart(item)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer com cálculos */}
                  <div className="flex-shrink-0 p-4 border-t border-gray-800 space-y-4">
                    {/* Calculador de Frete */}
                    <div className="space-y-3">
                      <label className="text-yellow-400 font-medium text-sm">Calcular Frete</label>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Digite seu CEP"
                          value={cep}
                          onChange={(e) => setCep(e.target.value.replace(/\D/g, "").slice(0, 8))}
                          className="bg-gray-900 border-gray-700 text-white text-sm"
                        />
                        <Button
                          onClick={calculateFrete}
                          size="icon"
                          className="bg-yellow-400 text-black hover:bg-yellow-500 h-9 w-9"
                        >
                          <Calculator className="h-4 w-4" />
                        </Button>
                      </div>
                      {frete !== null && (
                        <div className="text-green-400 text-sm space-y-1">
                          <p>Região: {regiao}</p>
                          <p>Frete: R$ {frete.toFixed(2)}</p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span className="text-yellow-400 font-bold">R$ {getCartTotal().toFixed(2)}</span>
                      </div>
                      {frete !== null && (
                        <div className="flex justify-between text-sm">
                          <span>Frete:</span>
                          <span className="text-yellow-400">R$ {frete.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-base font-bold">
                        <span>Total:</span>
                        <span className="text-yellow-400">R$ {(getCartTotal() + (frete || 0)).toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-green-600 text-white hover:bg-green-700 font-bold flex items-center justify-center space-x-2 h-10"
                      onClick={() => {
                        sendWhatsAppOrder(cart, frete)
                        setCart([])
                        setShowCart(false)
                      }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                      <span className="text-sm">Finalizar via WhatsApp</span>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sobre Section */}
      <section className="py-8 lg:py-16 px-4 bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-yellow-400">
            Sobre a Adega e Tabacaria Andrade
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-base lg:text-lg text-gray-300 mb-6 lg:mb-8 px-4">
              Há mais de 15 anos no mercado, a Adega e Tabacaria Andrade é referência em qualidade e variedade.
              Oferecemos as melhores marcas nacionais e importadas de bebidas, essências, carvões e acessórios para
              tabacaria, com entrega rápida e segura.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8 lg:mt-12">
              <div className="text-center p-4">
                <div className="text-3xl lg:text-4xl mb-3 lg:mb-4">🚚</div>
                <h3 className="text-lg lg:text-xl font-bold text-yellow-400 mb-2">Entrega Rápida</h3>
                <p className="text-gray-400 text-sm lg:text-base">Entregamos em até 2 horas na região metropolitana</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl lg:text-4xl mb-3 lg:mb-4">🏆</div>
                <h3 className="text-lg lg:text-xl font-bold text-yellow-400 mb-2">Qualidade Premium</h3>
                <p className="text-gray-400 text-sm lg:text-base">Produtos selecionados e armazenados adequadamente</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl lg:text-4xl mb-3 lg:mb-4">💳</div>
                <h3 className="text-lg lg:text-xl font-bold text-yellow-400 mb-2">Pagamento Seguro</h3>
                <p className="text-gray-400 text-sm lg:text-base">Aceitamos cartão, PIX e dinheiro na entrega</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section className="py-8 lg:py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 lg:mb-12 text-yellow-400">Contato</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-4 lg:p-6">
                <Phone className="h-6 w-6 lg:h-8 lg:w-8 text-yellow-400 mx-auto mb-3 lg:mb-4" />
                <h3 className="font-bold text-white mb-2 text-sm lg:text-base">Telefone</h3>
                <p className="text-gray-400 text-sm lg:text-base">(11) 94817-4784</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-4 lg:p-6">
                <Mail className="h-6 w-6 lg:h-8 lg:w-8 text-yellow-400 mx-auto mb-3 lg:mb-4" />
                <h3 className="font-bold text-white mb-2 text-sm lg:text-base">Email</h3>
                <p className="text-gray-400 text-sm lg:text-base">contato@adegaandrade.com</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-4 lg:p-6">
                <MapPin className="h-6 w-6 lg:h-8 lg:w-8 text-yellow-400 mx-auto mb-3 lg:mb-4" />
                <h3 className="font-bold text-white mb-2 text-sm lg:text-base">Endereço</h3>
                <p className="text-gray-400 text-sm lg:text-base">
                  Rua das Bebidas, 123
                  <br />
                  São Paulo - SP
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-4 lg:p-6">
                <Clock className="h-6 w-6 lg:h-8 lg:w-8 text-yellow-400 mx-auto mb-3 lg:mb-4" />
                <h3 className="font-bold text-white mb-2 text-sm lg:text-base">Horário</h3>
                <p className="text-gray-400 text-sm lg:text-base">
                  Qui-Dom
                  <br />
                  18:00 - 03:00
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <div className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-40">
        <Button
          size="lg"
          className="rounded-full w-12 h-12 lg:w-14 lg:h-14 bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => {
            const phoneNumber = "5511948174784"
            const message = "Olá! Gostaria de fazer um pedido na Adega e Tabacaria Andrade 🍷"
            const encodedMessage = encodeURIComponent(message)
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
            window.open(whatsappUrl, "_blank")
          }}
        >
          <svg className="w-6 h-6 lg:w-7 lg:h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </Button>
      </div>
    </div>
  )
}
