import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
        >
          <CheckCircle className="h-14 w-14 text-green-600" />
        </motion.div>

        <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
          Pesanan Berhasil! 🎉
        </h1>
        <p className="text-muted-foreground mb-6">
          Pesanan Anda sedang diproses oleh barista kami
        </p>

        {orderId && (
          <div className="bg-card p-4 rounded-2xl border border-border mb-6">
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="font-heading font-bold text-foreground">{orderId}</p>
          </div>
        )}

        <div className="bg-primary/10 p-4 rounded-2xl mb-6">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Clock className="h-5 w-5" />
            <span className="font-medium">Estimasi 10-15 menit</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link to="/order-tracking" className="block">
            <Button size="lg" className="w-full">
              Lihat Status Pesanan
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/menu" className="block">
            <Button size="lg" variant="outline" className="w-full">
              Kembali ke Menu
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccessPage;
