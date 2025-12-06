import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingBag,
  Coffee,
  Users,
  QrCode,
  Settings,
  Bell,
  TrendingUp,
  Clock,
  CheckCircle,
  X,
  Menu,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import QRCode from 'react-qr-code';

const mockOrders = [
  { id: 'ORD-001', table: 7, items: ['Cappuccino', 'Croissant'], total: 45000, status: 'pending', time: '2 min ago' },
  { id: 'ORD-002', table: 3, items: ['Iced Latte x2'], total: 56000, status: 'processing', time: '5 min ago' },
  { id: 'ORD-003', table: 12, items: ['Espresso', 'Mocha'], total: 48000, status: 'ready', time: '10 min ago' },
];

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: ShoppingBag, label: 'Pesanan', id: 'orders' },
  { icon: Coffee, label: 'Menu', id: 'menu' },
  { icon: QrCode, label: 'QR Meja', id: 'qr' },
  { icon: Users, label: 'Pelanggan', id: 'customers' },
  { icon: TrendingUp, label: 'Laporan', id: 'reports' },
  { icon: Settings, label: 'Pengaturan', id: 'settings' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState(mockOrders);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform lg:translate-x-0 lg:static',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Coffee className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-foreground">Warkop</h1>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveTab(link.id);
                setSidebarOpen(false);
              }}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                activeTab === link.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Link to="/">
            <Button variant="outline" className="w-full">
              Kembali ke Website
            </Button>
          </Link>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h2 className="font-heading font-semibold text-foreground capitalize">
                {activeTab}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
              </Button>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Pesanan Hari Ini', value: '24', icon: ShoppingBag, color: 'text-primary' },
                  { label: 'Pendapatan', value: 'Rp 1.2jt', icon: TrendingUp, color: 'text-green-600' },
                  { label: 'Pending', value: '3', icon: Clock, color: 'text-amber-600' },
                  { label: 'Selesai', value: '21', icon: CheckCircle, color: 'text-blue-600' },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card p-4 rounded-2xl border border-border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon className={cn('h-5 w-5', stat.color)} />
                    </div>
                    <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="p-4 border-b border-border">
                  <h3 className="font-heading font-semibold text-foreground">Pesanan Terbaru</h3>
                </div>
                <div className="divide-y divide-border">
                  {orders.map((order) => (
                    <div key={order.id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">{order.id}</span>
                            <span className="text-sm text-muted-foreground">• Meja {order.table}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {order.items.join(', ')}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="font-heading font-semibold text-primary">
                              {formatPrice(order.total)}
                            </span>
                            <span className="text-xs text-muted-foreground">{order.time}</span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <span className={cn(
                            'px-2 py-1 rounded-full text-xs font-medium capitalize',
                            getStatusColor(order.status)
                          )}>
                            {order.status}
                          </span>
                          
                          {order.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, 'processing')}
                            >
                              Proses
                            </Button>
                          )}
                          {order.status === 'processing' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateOrderStatus(order.id, 'ready')}
                            >
                              Siap
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'qr' && (
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-2xl border border-border">
                <h3 className="font-heading font-semibold text-foreground mb-4">
                  QR Code Generator - Meja
                </h3>
                <p className="text-muted-foreground mb-6">
                  Generate QR code untuk setiap meja. Pelanggan dapat scan untuk langsung memesan.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const tableNum = i + 1;
                    const qrUrl = `${window.location.origin}/order?table=${tableNum}`;
                    
                    return (
                      <div
                        key={tableNum}
                        className="bg-background p-4 rounded-xl border border-border text-center"
                      >
                        <div className="bg-card p-2 rounded-lg mb-3 inline-block">
                          <QRCode value={qrUrl} size={100} />
                        </div>
                        <p className="font-heading font-semibold text-foreground">
                          Meja {tableNum}
                        </p>
                        <Button variant="ghost" size="sm" className="mt-2 w-full">
                          Download
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-heading font-semibold text-foreground">Semua Pesanan</h3>
                <select className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm">
                  <option>Semua Status</option>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Ready</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Order ID</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Meja</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Items</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Total</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-muted/50">
                        <td className="px-4 py-3 font-medium text-foreground">{order.id}</td>
                        <td className="px-4 py-3 text-foreground">{order.table}</td>
                        <td className="px-4 py-3 text-muted-foreground">{order.items.join(', ')}</td>
                        <td className="px-4 py-3 font-heading font-semibold text-primary">
                          {formatPrice(order.total)}
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn(
                            'px-2 py-1 rounded-full text-xs font-medium capitalize',
                            getStatusColor(order.status)
                          )}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm">Detail</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {['menu', 'customers', 'reports', 'settings'].includes(activeTab) && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Coffee className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                Coming Soon
              </h3>
              <p className="text-muted-foreground">
                Fitur {activeTab} sedang dalam pengembangan
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
