import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <section className="bg-card border-b border-border py-12">
        <div className="container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Hubungi Kami
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-md mx-auto"
          >
            Ada pertanyaan atau feedback? Kami senang mendengar dari Anda!
          </motion.p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">
                Informasi Kontak
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    title: 'Alamat',
                    content: 'Jl. Kopi Nikmat No. 123, Kelurahan Kopi, Jakarta Selatan 12345',
                  },
                  {
                    icon: Phone,
                    title: 'Telepon',
                    content: '+62 812 3456 7890',
                  },
                  {
                    icon: Mail,
                    title: 'Email',
                    content: 'hello@warkopsop.id',
                  },
                  {
                    icon: Clock,
                    title: 'Jam Operasional',
                    content: 'Senin - Minggu: 07:00 - 22:00',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-medium text-foreground mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="bg-muted rounded-2xl h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p>Google Maps Integration</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-card p-6 md:p-8 rounded-2xl border border-border">
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">
                Kirim Pesan
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nama Depan</Label>
                    <Input id="firstName" placeholder="John" className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nama Belakang</Label>
                    <Input id="lastName" placeholder="Doe" className="mt-1" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    placeholder="08xxxxxxxxxx"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subjek</Label>
                  <Input
                    id="subject"
                    placeholder="Apa yang bisa kami bantu?"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Pesan</Label>
                  <Textarea
                    id="message"
                    placeholder="Tulis pesan Anda..."
                    className="mt-1 resize-none"
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    'Mengirim...'
                  ) : (
                    <>
                      Kirim Pesan
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
