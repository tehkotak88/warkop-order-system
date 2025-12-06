import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getProductById, products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { ProductCard } from '@/components/products/ProductCard';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const addItem = useCartStore((state) => state.addItem);

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]?.name || '');
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="font-heading text-xl font-semibold mb-2">Produk tidak ditemukan</h2>
          <Link to="/menu">
            <Button variant="outline">Kembali ke Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  const sizePrice = product.sizes?.find((s) => s.name === selectedSize)?.priceAdd || 0;
  const totalPrice = (product.price + sizePrice) * quantity;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSize}-${selectedVariant}`,
      name: product.name,
      price: product.price + sizePrice,
      image: product.image,
      size: selectedSize as 'S' | 'M' | 'L',
      variant: selectedVariant as 'Hot' | 'Ice',
      notes,
    });

    toast.success(`${product.name} ditambahkan ke keranjang!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen pb-24">
      {/* Back Button */}
      <div className="container py-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
      </div>

      {/* Product Details */}
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square rounded-3xl overflow-hidden bg-muted"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-sm">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {product.rating}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                {product.name}
              </h1>
              <p className="text-muted-foreground mt-2">{product.description}</p>
            </div>

            <div className="font-heading text-3xl font-bold text-primary">
              {formatPrice(product.price + sizePrice)}
            </div>

            {/* Size Selection */}
            {product.sizes && (
              <div>
                <h3 className="font-medium text-foreground mb-3">Pilih Ukuran</h3>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size.name)}
                      className={cn(
                        'flex-1 py-3 px-4 rounded-xl border text-center transition-all',
                        selectedSize === size.name
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border text-foreground hover:border-primary'
                      )}
                    >
                      <div className="font-semibold">{size.name}</div>
                      {size.priceAdd > 0 && (
                        <div className="text-xs text-muted-foreground">
                          +{formatPrice(size.priceAdd)}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variant Selection */}
            {product.variants && (
              <div>
                <h3 className="font-medium text-foreground mb-3">Pilih Varian</h3>
                <div className="flex gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant}
                      onClick={() => setSelectedVariant(variant)}
                      className={cn(
                        'flex-1 py-3 px-4 rounded-xl border text-center transition-all',
                        selectedVariant === variant
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border text-foreground hover:border-primary'
                      )}
                    >
                      <span className="mr-2">{variant === 'Hot' ? '🔥' : '🧊'}</span>
                      {variant}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Catatan untuk Barista</h3>
              <Textarea
                placeholder="Contoh: Less sugar, extra shot, dll."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="resize-none"
              />
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium text-foreground mb-3">Jumlah</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-heading text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-xl font-bold text-foreground mb-6">
              Produk Terkait
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50">
        <div className="container flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="font-heading text-xl font-bold text-primary">
              {formatPrice(totalPrice)}
            </p>
          </div>
          <Button variant="outline" size="lg" onClick={handleAddToCart}>
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button size="lg" onClick={handleBuyNow} className="flex-1 md:flex-none">
            Beli Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
