import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductFilters } from '@/components/product/ProductFilters';
import { products, categories } from '@/data/products';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('categoria') || 'todos';
  const searchQuery = searchParams.get('busca') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [onlyPromotion, setOnlyPromotion] = useState(false);
  const [sortBy, setSortBy] = useState('padrao');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Update category when URL param changes
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handlePromotionToggle = () => {
    setOnlyPromotion((prev) => !prev);
  };

  // Filter products
  let filteredProducts = products.filter((product) => {
    // Category filter
    if (selectedCategory !== 'todos' && product.category !== selectedCategory) {
      return false;
    }

    // Size filter
    if (selectedSizes.length > 0) {
      const hasSize = selectedSizes.some((size) => product.sizes.includes(size));
      if (!hasSize) return false;
    }

    // Promotion filter
    if (onlyPromotion && !product.isPromotion) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!product.name.toLowerCase().includes(query)) {
        return false;
      }
    }

    return true;
  });

  // Sort products
  if (sortBy === 'menor-preco') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'maior-preco') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'nome') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  }

  const categoryName = categories.find((c) => c.id === selectedCategory)?.name || 'Todos os produtos';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-background">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Mobile filter button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden flex items-center justify-center gap-2 py-3 border border-border"
            >
              <Filter className="w-4 h-4" />
              Filtrar
            </button>

            {/* Sidebar filters - desktop */}
            <div className="hidden md:block">
              <ProductFilters
                selectedCategory={selectedCategory}
                selectedSizes={selectedSizes}
                onlyPromotion={onlyPromotion}
                onCategoryChange={handleCategoryChange}
                onSizeToggle={handleSizeToggle}
                onPromotionToggle={handlePromotionToggle}
              />
            </div>

            {/* Mobile filters drawer */}
            {showMobileFilters && (
              <div className="fixed inset-0 z-50 md:hidden">
                <div className="absolute inset-0 bg-foreground/50" onClick={() => setShowMobileFilters(false)} />
                <div className="absolute left-0 top-0 h-full w-72 bg-background p-6 overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-xl font-semibold">Filtros</h2>
                    <button onClick={() => setShowMobileFilters(false)}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <ProductFilters
                    selectedCategory={selectedCategory}
                    selectedSizes={selectedSizes}
                    onlyPromotion={onlyPromotion}
                    onCategoryChange={handleCategoryChange}
                    onSizeToggle={handleSizeToggle}
                    onPromotionToggle={handlePromotionToggle}
                  />
                </div>
              </div>
            )}

            {/* Products grid */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h1 className="font-serif text-2xl md:text-3xl font-semibold">{categoryName}</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Resultado: {filteredProducts.length} produtos encontrados
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm text-muted-foreground">Ordenar por:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-border rounded-sm px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-dark"
                  >
                    <option value="padrao">Padrão</option>
                    <option value="menor-preco">Menor preço</option>
                    <option value="maior-preco">Maior preço</option>
                    <option value="nome">Nome A-Z</option>
                  </select>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">Nenhum produto encontrado.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
