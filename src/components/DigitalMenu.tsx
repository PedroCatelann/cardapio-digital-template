import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Plus,
  Minus,
  X,
} from "lucide-react";

import { Transition } from "@headlessui/react";

// Tipos TypeScript
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

// Dados de exemplo
const menuData: Category[] = [
  {
    id: "pratos-principais",
    name: "Pratos Principais",
    items: [
      {
        id: 1,
        name: "Salmão Grelhado",
        description:
          "Salmão fresco grelhado com ervas finas, acompanhado de risotto de limão siciliano",
        price: 45.9,
        image:
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
      },
      {
        id: 2,
        name: "Filé Mignon ao Molho Madeira",
        description:
          "Filé mignon suculento ao molho madeira, acompanhado de batatas rústicas",
        price: 52.9,
        image:
          "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
      },
    ],
  },
  {
    id: "sobremesas",
    name: "Sobremesas",
    items: [
      {
        id: 4,
        name: "Tiramisù Clássico",
        description:
          "Tradicional sobremesa italiana com café, mascarpone e cacau",
        price: 18.9,
        image:
          "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
      },
      {
        id: 5,
        name: "Petit Gâteau",
        description: "Bolinho de chocolate quente com sorvete de baunilha",
        price: 16.9,
        image:
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
      },
      {
        id: 6,
        name: "Cheesecake de Frutas Vermelhas",
        description: "Cremoso cheesecake com calda de frutas vermelhas",
        price: 19.9,
        image:
          "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop",
      },
    ],
  },
  {
    id: "bebidas",
    name: "Bebidas",
    items: [
      {
        id: 7,
        name: "Suco Natural de Laranja",
        description: "Suco natural de laranja fresco, sem conservantes",
        price: 8.9,
        image:
          "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop",
      },
      {
        id: 8,
        name: "Vinho Tinto Reserva",
        description: "Vinho tinto selecionado, ideal para acompanhar carnes",
        price: 45.0,
        image:
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop",
      },
      {
        id: 9,
        name: "Água com Gás Premium",
        description: "Água mineral com gás, gelada",
        price: 6.5,
        image:
          "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop",
      },
    ],
  },
  {
    id: "aperitivos",
    name: "Aperitivos",
    items: [
      {
        id: 11,
        name: "Tábua de Queijos",
        description: "Seleção de queijos especiais com geleia e castanhas",
        price: 28.9,
        image:
          "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop",
      },
    ],
  },
];

const DigitalMenu: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "pratos-principais",
  ]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateCartItemQuantity = (id: number, change: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Restaurante Gourmet
            </h1>
            <p className="text-gray-600 text-lg">
              Experiência gastronômica única
            </p>
          </div>
        </div>
      </header>

      {/* Menu */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {menuData.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg flex items-center justify-between hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
              >
                <span>{category.name}</span>
                {expandedCategories.includes(category.id) ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {/* Category Content */}
              <Transition
                show={expandedCategories.includes(category.id)} // controla abrir/fechar
                enter="transition-all duration-500 ease-in-out"
                enterFrom="max-h-0 opacity-0"
                enterTo="max-h-[1000px] opacity-100"
                leave="transition-all duration-500 ease-in-out"
                leaveFrom="max-h-[1000px] opacity-100"
                leaveTo="max-h-0 opacity-0"
              >
                <div className="">
                  <div className="grid gap-6">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200"
                      >
                        {/* Item Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        </div>

                        {/* Item Info */}
                        <div className="flex-grow">
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-indigo-600">
                              R$ {item.price.toFixed(2).replace(".", ",")}
                            </span>
                            <button
                              onClick={() => addToCart(item)}
                              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2 font-medium"
                            >
                              <Plus className="w-4 h-4" />
                              Adicionar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Transition>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Button */}
      {cart.length > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200 hover:scale-105"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
              {getTotalItems()}
            </span>
          </div>
        </button>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-opacity-25 backdrop-blur-3xl flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Seu Pedido</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Seu carrinho está vazio
                </p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          R$ {item.price.toFixed(2).replace(".", ",")} cada
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartItemQuantity(item.id, -1)}
                          className="text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartItemQuantity(item.id, 1)}
                          className="text-gray-500 hover:text-indigo-600 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-indigo-600">
                    R$ {getTotalPrice().toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                  Finalizar Pedido
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalMenu;
