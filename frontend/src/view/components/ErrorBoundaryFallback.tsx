import { Button } from './Button';

export const ErrorBoundaryFallback = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ops, algo deu errado!
        </h1>
        <p className="mt-4 text-muted-foreground">
          Desculpe, mas ocorreu um erro inesperado. Por favor, tente novamente
          mais tarde ou entre em contato com o suporte se o problema persistir.
        </p>
        <div className="mt-6">
          <Button
            onClick={() => window.location.reload()}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Recarregar Página
          </Button>
        </div>
      </div>
    </div>
  );
};
