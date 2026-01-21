import { categories, sizes } from '@/data/products';

interface ProductFiltersProps {
  selectedCategory: string;
  selectedSizes: string[];
  onlyPromotion: boolean;
  onCategoryChange: (category: string) => void;
  onSizeToggle: (size: string) => void;
  onPromotionToggle: () => void;
}

export function ProductFilters({
  selectedCategory,
  selectedSizes,
  onlyPromotion,
  onCategoryChange,
  onSizeToggle,
  onPromotionToggle,
}: ProductFiltersProps) {
  return (
    <aside className="w-full md:w-56 flex-shrink-0">
      {/* Categories */}
      <div className="mb-8">
        <h3 className="font-serif text-xl font-semibold mb-4">Categorias</h3>
        <div className="space-y-1">
          {categories.map((cat) => (
            <label key={cat.id} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedCategory === cat.id}
                onChange={() => onCategoryChange(cat.id)}
                className="w-4 h-4 border-border rounded-sm accent-dark"
              />
              <span className={selectedCategory === cat.id ? 'font-medium text-foreground' : ''}>
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-8">
        <h3 className="font-serif text-xl font-semibold mb-4">Tamanho</h3>
        <div className="space-y-1">
          {sizes.map((size) => (
            <label key={size} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() => onSizeToggle(size)}
                className="w-4 h-4 border-border rounded-sm accent-dark"
              />
              <span className={selectedSizes.includes(size) ? 'font-medium text-foreground' : ''}>
                Tamanho {size}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Promotions */}
      <div>
        <h3 className="font-serif text-xl font-semibold mb-4">Promoções</h3>
        <div className="space-y-1">
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={!onlyPromotion}
              onChange={onPromotionToggle}
              className="w-4 h-4 border-border rounded-sm accent-dark"
            />
            <span className={!onlyPromotion ? 'font-medium text-foreground' : ''}>
              Todos
            </span>
          </label>
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={onlyPromotion}
              onChange={onPromotionToggle}
              className="w-4 h-4 border-border rounded-sm accent-dark"
            />
            <span className={onlyPromotion ? 'font-medium text-foreground' : ''}>
              Somente promoção
            </span>
          </label>
        </div>
      </div>
    </aside>
  );
}
