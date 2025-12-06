import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cartStore';
import { products } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, tableNumber, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();
  const serviceFee = 2000;
  const tax = totalPrice * 0.1;
  const grandTotal = totalPrice + serviceFee + tax;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const recommendedProducts = products.filter(
    (p) => !items.some((item) => item.id.startsWith(p.id))
  ).slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
            Keranjang Kosong
          </h2>
          <p className="text-muted-foreground mb-6">
            Yuk, mulai tambahkan menu favoritmu!
          </p>
          <Link to="/menu">
            <Button>Lihat Menu</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-48">
      {/* Header */}
      <div className="container py-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <h1 className="font-heading text-2xl font-bold text-foreground mt-4">
          Keranjang
        </h1>
        {tableNumber && (
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            🪑 Meja {tableNumber}
          </div>
        )}
      </div>

      {/* Cart Items */}
      <div className="container space-y-4">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex gap-4 p-4 bg-card rounded-2xl border border-border"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{item.name}</h3>
                    <div className="flex gap-2 mt-1">
                      {item.size && (
                        <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                          {item.size}
                        </span>
                      )}
                      {item.variant && (
                        <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                          {item.variant}
                        </span>
                      )}
                    </div>
                    {item.notes && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        📝 {item.notes}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <p className="font-heading font-semibold text-primary">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Promo Code */}
        <div className="flex gap-2 p-4 bg-card rounded-2xl border border-border">
          <Input placeholder="Kode promo" className="flex-1" />
          <Button variant="outline">Gunakan</Button>
        </div>
      </div>

      {/* Recommendations */}
      {recommendedProducts.length > 0 && (
        <div className="container mt-8">
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
            Mungkin Kamu Suka
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommendedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Fixed Bottom Summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 pb-20 md:pb-4 z-50">
        <div className="container">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Biaya Layanan</span>
              <span className="text-foreground">{formatPrice(serviceFee)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Pajak (10%)</span>
              <span className="text-foreground">{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border">
              <span className="font-heading font-semibold text-foreground">Total</span>
              <span className="font-heading font-bold text-xl text-primary">
                {formatPrice(grandTotal)}
              </span>
            </div>
          </div>
          <Link to="/checkout">
            <Button size="lg" className="w-full">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
