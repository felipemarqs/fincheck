import { Button } from '@/view/components/Button';
import { useState, useEffect } from 'react';

export default function InDevelopment() {
  const [typedText, setTypedText] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const fullText = 'Em breve, página em desenvolvimento';

  useEffect(() => {
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 100);

    return () => clearInterval(typingEffect);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <h1 className="text-4xl sm:text-6xl font-bold text-center mb-8">
        {typedText}
        <span className="animate-pulse">|</span>
      </h1>
      <Button variant="ghost" onClick={() => setShowMessage(!showMessage)}>
        {showMessage ? 'Ocultar detalhes' : 'Mais informações'}
      </Button>
      {showMessage && (
        <p className="mt-4 text-center text-muted-foreground max-w-md">
          Estamos trabalhando duro para trazer novidades incríveis. Fique ligado
          para atualizações em breve!
        </p>
      )}
    </div>
  );
}
