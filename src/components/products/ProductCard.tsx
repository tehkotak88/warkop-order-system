import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Star, Flame, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/data/products';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    
    toast.success(`${product.name} ditambahkan ke keranjang!`, {
      duration: 2000,
    });
    
    setTimeout(() => setIsAdding(false), 300);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/product/${product.id}`}>
        <div className="group relative bg-card rounded-2xl overflow-hidden card-shadow card-hover border border-border/50">
          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex gap-2">
            {product.isBestseller && (
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                <Flame className="h-3 w-3" />
                Best
              </span>
            )}
            {product.isNew && (
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                <Sparkles className="h-3 w-3" />
                New
              </span>
            )}
          </div>

          {/* Image */}
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-foreground truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div>
                <p className="font-heading font-bold text-primary">
                  {formatPrice(product.price)}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
              </div>

              <Button
                variant="soft"
                size="icon-sm"
                onClick={handleQuickAdd}
                className={cn(
                  'rounded-full transition-transform',
                  isAdding && 'scale-110'
                )}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
