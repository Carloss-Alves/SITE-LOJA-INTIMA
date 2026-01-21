import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { HeroBanner } from '@/components/home/HeroBanner';
import { BenefitsBar } from '@/components/home/BenefitsBar';

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Benefits Bar */}
        <BenefitsBar />

        {/* About Section */}
        <section className="py-16 md:py-24">
          <div className="container max-w-4xl text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6">
              Aurora Íntima
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Nosso objetivo é libertar mulheres e aumentar sua autoestima através de peças que 
              exalam sua sensualidade, beleza e te entregam muito conforto. Cada peça é pensada 
              com carinho para que você se sinta única e poderosa.
            </p>
            <p className="text-muted-foreground mb-8">
              De Brasília para todo Brasil. 🖤
            </p>
            <Link
              to="/produtos"
              className="inline-block py-4 px-10 bg-dark text-dark-foreground text-sm font-medium uppercase tracking-wider hover:bg-foreground transition-colors"
            >
              Conheça nossa coleção
            </Link>
          </div>
        </section>

        {/* Categories section */}
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-2">
                Categorias
              </h2>
              <p className="text-muted-foreground">
                Explore nossa coleção
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Babydoll', slug: 'babydoll' },
                { name: 'Bodys', slug: 'bodys' },
                { name: 'Calcinhas', slug: 'calcinhas' },
                { name: 'Camisolas', slug: 'camisolas' },
                { name: 'Conjuntos', slug: 'conjuntos' },
                { name: 'Croppeds', slug: 'croppeds' },
              ].map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/produtos?categoria=${cat.slug}`}
                  className="group bg-background p-6 text-center border border-border hover:border-dark transition-colors"
                >
                  <h3 className="font-serif text-lg font-medium group-hover:text-muted-foreground transition-colors">
                    {cat.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
