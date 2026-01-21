import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();

  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleFinishOrder = () => {
  if (items.length === 0) return;

  const phoneNumber = '5561998698555';

  // Build order message
  let message = '🛍️ *Novo Pedido - Aurora Íntima*\n\n';
  message += '*Itens do pedido:*\n';

  items.forEach((item, index) => {
    message += `\n${index + 1}. *${item.product.name}*\n`;
    message += `   Tamanho: ${item.size}\n`;
    message += `   Cor: ${item.color}\n`;
    message += `   Quantidade: ${item.quantity}\n`;
    message += `   Preço: ${formatPrice(item.product.price * item.quantity)}\n`;
  });

  message += `\n-------------------\n`;
  message += `*Total: ${formatPrice(totalPrice)}*\n\n`;
  message += `Olá! Gostaria de finalizar este pedido. 😊`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Clear cart and redirect to WhatsApp
  clearCart();
  window.open(whatsappUrl, '_blank');
};


  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        <div className="container py-8 md:py-12">
          <h1 className="font-serif text-2xl md:text-3xl font-semibold mb-8">
            Minha Sacola
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-6">Sua sacola está vazia</p>
              <Link
                to="/produtos"
                className="inline-block py-3 px-8 bg-dark text-dark-foreground text-sm font-medium uppercase tracking-wider hover:bg-foreground transition-colors"
              >
                Continuar comprando
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-4 p-4 border border-border"
                  >
                    <Link to={`/produto/${item.product.id}`} className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-32 object-cover"
                      />
                    </Link>
                    
                    <div className="flex-1">
                      <Link to={`/produto/${item.product.id}`}>
                        <h3 className="font-medium mb-1 hover:text-muted-foreground transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-1">
                        Tamanho: {item.size}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Cor: {item.color}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-accent transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-10 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-accent transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <span className="font-semibold">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeItem(item.product.id, item.size, item.color)}
                      className="self-start p-2 text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remover item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-secondary p-6 sticky top-28">
                  <h2 className="font-serif text-xl font-semibold mb-4">
                    Resumo do Pedido
                  </h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frete</span>
                      <span className="text-muted-foreground">
                        {totalPrice >= 499 ? 'Grátis' : 'A calcular'}
                      </span>
                    </div>
                    {totalPrice < 499 && (
                      <p className="text-xs text-muted-foreground">
                        Frete grátis em compras acima de R$ 499,00
                      </p>
                    )}
                  </div>
                  
                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleFinishOrder}
                    className="w-full py-4 bg-dark text-dark-foreground text-sm font-medium uppercase tracking-wider hover:bg-foreground transition-colors"
                  >
                    Finalizar Pedido
                  </button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Você será redirecionado para o WhatsApp para finalizar sua compra
                  </p>
                  
                  <Link
                    to="/produtos"
                    className="block text-center text-sm text-muted-foreground hover:text-foreground mt-4 transition-colors"
                  >
                    Continuar comprando
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
