import { Loader2 } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-accent/30 dark:bg-gray-900">
      <div className="text-center">
        <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin" />
        <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
          Carregando...
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Isso pode levar alguns segundos
        </p>
      </div>
    </div>
  );
}
