import { ShieldCheck, MessageCircle, Truck, Gift } from 'lucide-react';

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Compra segura',
    description: 'Seus dados protegidos',
  },
  
  {
    icon: Truck,
    title: 'Entrega rápida',
    description: 'Entregamos em todo o Brasil',
  },
  {
    icon: Gift,
    title: 'Frete grátis',
    description: 'Em compras acima de R$ 300,00',
  },
];

export function BenefitsBar() {
  return (
    <section className="bg-secondary border-y border-border">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 md:py-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="benefit-item">
              <benefit.icon className="benefit-icon" strokeWidth={1.5} />
              <h3 className="benefit-title text-sm">{benefit.title}</h3>
              <p className="benefit-desc">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
