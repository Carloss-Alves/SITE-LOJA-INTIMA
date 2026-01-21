import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  productName?: string;
}

export function WhatsAppButton({ productName }: WhatsAppButtonProps) {
  const phoneNumber = '5561998698555';
  const defaultMessage = productName 
    ? `Olá! Gostaria de saber mais sobre o produto ${productName}.`
    : 'Olá! Gostaria de saber mais sobre os produtos.';
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
