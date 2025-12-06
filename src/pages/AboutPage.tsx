import { motion } from 'framer-motion';
import { Clock, MapPin, Coffee, Heart, Target, Award } from 'lucide-react';
import interiorImage from '@/assets/about-interior.jpg';

const AboutPage = () => {
  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={interiorImage}
          alt="Coffee shop interior"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container pb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-3xl md:text-4xl font-bold text-foreground"
          >
            Tentang Kami
          </motion.h1>
        </div>
      </section>

      <div className="container py-12 space-y-16">
        {/* Story */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
            Cerita Kami ☕
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Warkop Sop Saudara Azzahra bermula dari kecintaan kami terhadap kopi dan komunitas. 
            Didirikan pada tahun 2020, kami memulai perjalanan dengan satu misi sederhana: 
            menyajikan kopi berkualitas tinggi dengan suasana yang hangat dan ramah.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Nama "Sop Saudara Azzahra" terinspirasi dari filosofi persaudaraan dan kebersamaan. 
            Kami percaya bahwa secangkir kopi bisa menyatukan orang-orang dari berbagai latar belakang, 
            menciptakan momen berharga dan percakapan bermakna.
          </p>
        </motion.section>

        {/* Values */}
        <section>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">
            Nilai-Nilai Kami
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Coffee,
                title: 'Kualitas Premium',
                description: 'Hanya menggunakan biji kopi single origin dari petani lokal terbaik',
              },
              {
                icon: Heart,
                title: 'Pelayanan Hangat',
                description: 'Melayani dengan sepenuh hati seperti melayani keluarga sendiri',
              },
              {
                icon: Target,
                title: 'Inovasi Berkelanjutan',
                description: 'Selalu berinovasi untuk memberikan pengalaman terbaik',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-2xl border border-border text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Vision Mission */}
        <section className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-primary/10 p-8 rounded-2xl"
          >
            <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Visi
            </h3>
            <p className="text-muted-foreground">
              Menjadi coffee shop pilihan utama yang menghadirkan pengalaman ngopi terbaik 
              dengan kualitas premium dan pelayanan yang hangat di setiap cangkir.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-secondary/30 p-8 rounded-2xl"
          >
            <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Award className="h-6 w-6 text-secondary" />
              Misi
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Menyajikan kopi berkualitas tinggi dari petani lokal</li>
              <li>• Menciptakan suasana nyaman untuk bekerja dan bersantai</li>
              <li>• Memberikan pelayanan ramah dan cepat</li>
              <li>• Mendukung komunitas kopi Indonesia</li>
            </ul>
          </motion.div>
        </section>

        {/* Operating Hours */}
        <section className="text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
            Jam Operasional
          </h2>
          <div className="inline-flex flex-col gap-4 bg-card p-8 rounded-2xl border border-border">
            <div className="flex items-center gap-4">
              <Clock className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="font-medium text-foreground">Senin - Jumat</p>
                <p className="text-muted-foreground">07:00 - 22:00</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="font-medium text-foreground">Sabtu - Minggu</p>
                <p className="text-muted-foreground">08:00 - 23:00</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="h-5 w-5 text-primary" />
              <div className="text-left">
                <p className="font-medium text-foreground">Lokasi</p>
                <p className="text-muted-foreground">Jl. Kopi Nikmat No. 123, Jakarta</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
