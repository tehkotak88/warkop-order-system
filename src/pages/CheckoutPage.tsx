import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Banknote, QrCode, MapPin, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const paymentMethods = [
  { id: 'qris', name: 'QRIS', icon: QrCode, description: 'Scan & bayar' },
  { id: 'cash', name: 'Cash', icon: Banknote, description: 'Bayar di kasir' },
  { id: 'ewallet', name: 'E-Wallet', icon: CreditCard, description: 'GoPay, OVO, dll' },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, tableNumber, orderType, getTotalPrice, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDineIn = orderType === 'dine-in' || tableNumber !== null;
  const totalPrice = getTotalPrice();
  const serviceFee = 2000;
  const deliveryFee = isDineIn ? 0 : 10000;
  const tax = totalPrice * 0.1;
  const grandTotal = totalPrice + serviceFee + deliveryFee + tax;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handlePlaceOrder = async () => {
    if (!isDineIn && !address) {
      toast.error('Mohon isi alamat pengiriman');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const orderId = `ORD-${Date.now()}`;
    clearCart();
    
    navigate(`/order-success?orderId=${orderId}`);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen pb-40">
      {/* Header */}
      <div className="container py-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>
        <h1 className="font-heading text-2xl font-bold text-foreground mt-4">
          Checkout
        </h1>
      </div>

      <div className="container space-y-6">
        {/* Order Type Badge */}
        {isDineIn && tableNumber && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-primary/10 border border-primary/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-2xl">🪑</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dine In</p>
                <p className="font-heading text-lg font-bold text-primary">
                  Meja {tableNumber}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Customer Info */}
        <div className="bg-card p-4 rounded-2xl border border-border space-y-4">
          <h2 className="font-heading font-semibold text-foreground">
            Informasi Pelanggan
          </h2>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="name">Nama (Opsional)</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Nama Anda"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {!isDineIn && (
              <>
                <div>
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="08xxxxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Alamat Pengiriman</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="address"
                      placeholder="Alamat lengkap..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="pl-10 resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-card p-4 rounded-2xl border border-border space-y-4">
          <h2 className="font-heading font-semibold text-foreground">
            Ringkasan Pesanan
          </h2>

          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{item.name}</p>
                  <div className="flex gap-2">
                    {item.size && (
                      <span className="text-xs text-muted-foreground">{item.size}</span>
                    )}
                    {item.variant && (
                      <span className="text-xs text-muted-foreground">• {item.variant}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                  <p className="font-medium text-foreground">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-card p-4 rounded-2xl border border-border space-y-4">
          <h2 className="font-heading font-semibold text-foreground">
            Metode Pembayaran
          </h2>

          <div className="grid grid-cols-3 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-xl border transition-all',
                  paymentMethod === method.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary'
                )}
              >
                <method.icon className={cn(
                  'h-6 w-6',
                  paymentMethod === method.id ? 'text-primary' : 'text-muted-foreground'
                )} />
                <span className={cn(
                  'font-medium text-sm',
                  paymentMethod === method.id ? 'text-primary' : 'text-foreground'
                )}>
                  {method.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom */}
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
            {!isDineIn && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ongkir</span>
                <span className="text-foreground">{formatPrice(deliveryFee)}</span>
              </div>
            )}
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
          <Button
            size="lg"
            className="w-full"
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Memproses...' : 'Place Order'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
