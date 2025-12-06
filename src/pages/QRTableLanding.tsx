import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';

const QRTableLanding = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tableNumber = searchParams.get('table');
  const { setTableNumber, setOrderType } = useCartStore();

  useEffect(() => {
    if (tableNumber) {
      setTableNumber(parseInt(tableNumber));
      setOrderType('dine-in');
    }
  }, [tableNumber, setTableNumber, setOrderType]);

  const handleStartOrder = () => {
    navigate('/menu');
  };

  if (!tableNumber) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="font-heading text-xl font-semibold mb-2">QR Code Tidak Valid</h2>
          <p className="text-muted-foreground mb-4">Mohon scan QR code yang tersedia di meja</p>
          <Button onClick={() => navigate('/')}>Ke Halaman Utama</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary flex items-center justify-center shadow-lg"
        >
          <Coffee className="h-10 w-10 text-primary-foreground" />
        </motion.div>

        <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
          Selamat Datang di
        </h1>
        <h2 className="font-heading text-3xl font-bold text-gradient mb-6">
          Warkop Sop Saudara Azzahra
        </h2>

        {/* Table Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-primary/10 border border-primary/20 rounded-2xl p-6 mb-8"
        >
          <p className="text-sm text-muted-foreground mb-1">Anda memesan dari</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl">🪑</span>
            <span className="font-heading text-4xl font-bold text-primary">
              Meja {tableNumber}
            </span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button size="xl" className="w-full mb-4" onClick={handleStartOrder}>
            Mulai Pesan
            <ArrowRight className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Promo Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl p-4 border border-border mb-6"
        >
          <p className="text-sm text-muted-foreground">🎉 Promo Hari Ini</p>
          <p className="font-medium text-foreground">Beli 2 Gratis 1 untuk semua Ice Coffee!</p>
        </motion.div>

        {/* Operating Hours */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>07:00 - 22:00</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>Jakarta</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default QRTableLanding;
