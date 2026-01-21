import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, Heart, Copy, Share2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { BenefitsBar } from '@/components/home/BenefitsBar';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import { toast } from '@/hooks/use-toast';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  
  const product = products.find((p) => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-2xl mb-4">Produto não encontrado</h1>
            <Link to="/produtos" className="text-sm underline">
              Voltar para produtos
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      toast({
        title: "Selecione um tamanho",
        description: "Por favor, escolha um tamanho antes de comprar.",
        variant: "destructive",
      });
      return;
    }

    addItem(product, selectedSize, selectedColor, quantity);
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado à sua sacola.`,
    });
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const text = `Confira: ${product.name} - ${formatPrice(product.price)}`;

    switch (platform) {
      case 'copy':
        await navigator.clipboard.writeText(url);
        toast({ title: "Link copiado!" });
        break;
      case 'whatsapp':
        window.open(`wa.me/5561998698555 + ' ' + url)}`, '_blank');
        break;
    }
  };

  const images = product.images || [product.image];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image gallery */}
            <div className="flex gap-4">
              {/* Thumbnails */}
              <div className="hidden md:flex flex-col gap-2 w-20">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square border-2 overflow-hidden transition-all ${
                      selectedImage === index ? 'border-dark' : 'border-transparent hover:border-muted'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className="flex-1">
                <div className="aspect-[3/4] bg-accent overflow-hidden">
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Mobile thumbnails */}
                <div className="flex md:hidden gap-2 mt-2 overflow-x-auto">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 flex-shrink-0 border-2 overflow-hidden ${
                        selectedImage === index ? 'border-dark' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product info */}
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-6">
                <span className="price text-xl md:text-2xl">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                  <span className="price-old text-base">{formatPrice(product.oldPrice)}</span>
                )}
              </div>

              {/* Size selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium uppercase tracking-wider mb-3">
                  Tamanho:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      className={`size-btn ${selectedSize === size ? 'selected' : ''} ${
                        sizeError && !selectedSize ? 'border-destructive' : ''
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizeError && !selectedSize && (
                  <p className="text-destructive text-sm mt-2">Selecione um tamanho</p>
                )}
              </div>

              {/* Color selector */}
              <div className="mb-8">
                <label className="block text-sm font-medium uppercase tracking-wider mb-3">
                  Cor:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and buy */}
              <div className="flex gap-4 mb-6">
                <div className="flex items-center border border-border">
                  <button onClick={() => handleQuantityChange(-1)} className="qty-btn">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="qty-input flex items-center justify-center">{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)} className="qty-btn">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button onClick={handleAddToCart} className="btn-buy flex-1">
                  Comprar
                </button>
              </div>

              {/* Favorite */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Salvar como favorito
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current text-destructive' : ''}`} />
              </button>

              {/* Share */}
              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground">Compartilhar produto</span>
                <button onClick={() => handleShare('copy')} className="p-2 hover:bg-accent rounded-full transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
                <button onClick={() => handleShare('facebook')} className="p-2 hover:bg-accent rounded-full transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button onClick={() => handleShare('twitter')} className="p-2 hover:bg-accent rounded-full transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button onClick={() => handleShare('whatsapp')} className="p-2 hover:bg-accent rounded-full transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-12 pt-12 border-t border-border">
            <h2 className="font-serif text-2xl font-semibold text-center mb-6">Descrição</h2>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-muted-foreground">
                {product.description}
              </p>
              <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                <li>• Tamanho disponível: {product.sizes.join(', ')}</li>
              </ul>
            </div>
          </div>
        </div>

        <BenefitsBar />
      </main>

      <Footer />
      <WhatsAppButton productName={product.name} />
    </div>
  );
}
