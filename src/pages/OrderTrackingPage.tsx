import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Coffee, Package, CheckCircle, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const orderSteps = [
  { id: 'pending', label: 'Pesanan Diterima', icon: Package, description: 'Pesanan masuk ke sistem' },
  { id: 'processing', label: 'Diproses', icon: Coffee, description: 'Barista menyiapkan pesanan' },
  { id: 'ready', label: 'Siap', icon: CheckCircle, description: 'Pesanan siap diambil/diantar' },
  { id: 'completed', label: 'Selesai', icon: CheckCircle, description: 'Pesanan telah diterima' },
];

const OrderTrackingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Simulate order progress
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="container py-4">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </Link>
        <h1 className="font-heading text-2xl font-bold text-foreground mt-4">
          Status Pesanan
        </h1>
      </div>

      <div className="container">
        {/* Order Info */}
        <div className="bg-card p-4 rounded-2xl border border-border mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-heading font-bold text-foreground">ORD-{Date.now()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Estimasi</p>
              <p className="font-medium text-primary">10-15 menit</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {orderSteps.map((step, index) => {
            const isActive = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 pb-8 last:pb-0"
              >
                {/* Line & Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                      isActive || isCurrent
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  {index < orderSteps.length - 1 && (
                    <div
                      className={cn(
                        'w-0.5 flex-1 mt-2 transition-colors',
                        isActive ? 'bg-primary' : 'bg-border'
                      )}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1.5">
                  <h3
                    className={cn(
                      'font-medium transition-colors',
                      isActive || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {step.label}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {step.description}
                  </p>
                  {isCurrent && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                      </span>
                      Sedang berlangsung
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Ada masalah dengan pesanan?</p>
          <Button variant="outline">Hubungi Kami</Button>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
