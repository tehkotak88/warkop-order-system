import { Link } from 'react-router-dom';
import { Coffee, MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border pb-20 md:pb-0">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Coffee className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground">Warkop</h3>
                <p className="text-xs text-muted-foreground">Sop Saudara Azzahra</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Menyajikan kopi berkualitas dengan cinta dan kehangatan untuk setiap pelanggan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-foreground">Menu</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/menu?category=hot-coffee" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Hot Coffee
                </Link>
              </li>
              <li>
                <Link to="/menu?category=iced-coffee" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Ice Coffee
                </Link>
              </li>
              <li>
                <Link to="/menu?category=snacks" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Snacks
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-foreground">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>Jl. Kopi Nikmat No. 123, Jakarta</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@warkopsop.id</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-foreground">Jam Operasional</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                <span>Senin - Jumat: 07:00 - 22:00</span>
              </li>
              <li className="text-sm text-muted-foreground pl-6">
                Sabtu - Minggu: 08:00 - 23:00
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2024 Warkop Sop Saudara Azzahra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
