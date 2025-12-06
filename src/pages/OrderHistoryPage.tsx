import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock orders data
const orders = [
  {
    id: 'ORD-1234567890',
    date: '2024-01-15',
    items: ['Cappuccino (M)', 'Croissant'],
    total: 45000,
    status: 'completed',
  },
  {
    id: 'ORD-1234567891',
    date: '2024-01-14',
    items: ['Iced Latte (L)', 'Iced Americano (M)'],
    total: 55000,
    status: 'completed',
  },
];

const OrderHistoryPage = () => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'processing':
        return 'status-processing';
      case 'ready':
        return 'status-ready';
      case 'completed':
        return 'status-completed';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
            Belum Ada Pesanan
          </h2>
          <p className="text-muted-foreground mb-6">
            Yuk, mulai pesan kopi favoritmu!
          </p>
          <Link to="/menu">
            <Button>Lihat Menu</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="container py-6">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Riwayat Pesanan
        </h1>
        <p className="text-muted-foreground mt-1">
          Lihat semua pesanan Anda
        </p>
      </div>

      {/* Orders List */}
      <div className="container space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/order-tracking?orderId=${order.id}`}>
              <div className="bg-card p-4 rounded-2xl border border-border hover:border-primary transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-foreground">{order.id}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Clock className="h-4 w-4" />
                      {new Date(order.date).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                  <span
                    className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium capitalize',
                      getStatusBadge(order.status)
                    )}
                  >
                    {order.status === 'completed' ? 'Selesai' : order.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {order.items.join(', ')}
                    </p>
                    <p className="font-heading font-semibold text-primary mt-1">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
