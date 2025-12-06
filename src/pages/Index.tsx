import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { getBestsellers, categories } from '@/data/products';
import heroImage from '@/assets/hero-coffee.jpg';
import interiorImage from '@/assets/about-interior.jpg';

const Index = () => {
  const bestsellers = getBestsellers();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Premium coffee"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>

        {/* Content */}
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Clock className="h-4 w-4" />
              Buka Setiap Hari 07:00 - 22:00
            </span>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Kopi Nikmat{' '}
              <span className="text-gradient">Setiap Hari</span>
            </h1>

            <p className="mt-4 text-lg text-muted-foreground max-w-md">
              Nikmati kehangatan kopi pilihan kami yang disajikan dengan cinta dan kehangatan untuk memulai hari Anda.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/menu">
                <Button size="lg" variant="hero">
                  Order Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/menu">
                <Button size="lg" variant="hero-outline">
                  Lihat Menu
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2 mt-8 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm">Jl. Kopi Nikmat No. 123, Jakarta</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-card">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Kategori Menu
            </h2>
            <p className="text-muted-foreground mt-2">Temukan minuman favoritmu</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            {categories.filter(c => c.id !== 'all').map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Link
                  to={`/menu?category=${category.id}`}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-background border border-border hover:border-primary hover:shadow-soft transition-all duration-300"
                >
                  <span className="text-4xl">{category.icon}</span>
                  <span className="font-medium text-foreground">{category.name}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Best Sellers ⭐
              </h2>
              <p className="text-muted-foreground mt-1">Menu favorit pelanggan kami</p>
            </div>
            <Link to="/menu">
              <Button variant="ghost">
                Lihat Semua
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestsellers.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-8">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl coffee-gradient p-8 md:p-12"
          >
            <div className="relative z-10 max-w-md">
              <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium mb-4">
                Promo Spesial
              </span>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">
                Diskon 20% untuk Pemesanan Pertama!
              </h3>
              <p className="text-primary-foreground/80 mt-2">
                Gunakan kode <strong>NGOPI20</strong> saat checkout
              </p>
              <Link to="/menu">
                <Button variant="secondary" size="lg" className="mt-6">
                  Order Sekarang
                </Button>
              </Link>
            </div>
            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-primary-foreground/10" />
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-foreground/10" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={interiorImage}
                alt="Coffee shop interior"
                className="rounded-3xl shadow-hover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Tentang Kami
              </span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Lebih dari Sekedar Secangkir Kopi
              </h2>
              <p className="text-muted-foreground">
                Warkop Sop Saudara Azzahra hadir untuk menyajikan pengalaman ngopi yang berbeda. 
                Dengan biji kopi pilihan dari petani lokal dan racikan barista berpengalaman, 
                kami berkomitmen memberikan yang terbaik untuk setiap cangkir.
              </p>
              <ul className="space-y-3">
                {['Biji kopi single origin', 'Roasting segar setiap minggu', 'Barista bersertifikat'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-foreground">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/about">
                <Button variant="outline">
                  Selengkapnya
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Apa Kata Mereka? 💬
            </h2>
            <p className="text-muted-foreground mt-2">Review dari pelanggan setia kami</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Budi Santoso',
                review: 'Kopi terenak di Jakarta! Suasananya juga nyaman banget buat kerja.',
                rating: 5,
              },
              {
                name: 'Sarah Amanda',
                review: 'Iced latte-nya juara! Pelayanannya ramah dan cepat.',
                rating: 5,
              },
              {
                name: 'Ricky Pratama',
                review: 'QR ordering-nya praktis banget. Gak perlu antri lagi!',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-2xl border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-amber-400">⭐</span>
                  ))}
                </div>
                <p className="text-foreground mb-4">"{testimonial.review}"</p>
                <p className="font-medium text-muted-foreground">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
