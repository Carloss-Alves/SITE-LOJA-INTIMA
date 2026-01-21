import { Link } from 'react-router-dom';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="product-card group">
      <Link to={`/produto/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-accent">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          {product.isPromotion && (
            <span className="absolute top-3 left-3 bg-dark text-dark-foreground text-xs font-medium px-2 py-1">
              PROMOÇÃO
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-4 text-center">
        <Link to={`/produto/${product.id}`}>
          <h3 className="text-sm font-medium mb-2 hover:text-muted-foreground transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="price text-base">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="price-old">{formatPrice(product.oldPrice)}</span>
          )}
        </div>
        
        <Link to={`/produto/${product.id}`} className="btn-details block">
          Ver detalhes
        </Link>
      </div>
    </div>
  );
}
