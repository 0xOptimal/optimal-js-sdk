import { createContext, useContext, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { OptimalClient, type OptimalConfig } from "@getoptimal/js-sdk";

type OptimalContextValue = OptimalClient;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export const OptimalContext = createContext<OptimalContextValue | null>(null);
export const optimalQueryContext = createContext<QueryClient | undefined>(
  undefined,
);

export const OptimalProvider = ({
  config,
  children,
}: {
  config?: OptimalConfig;
  children?: ReactNode;
}) => {
  const client = new OptimalClient(config);

  return (
    <OptimalContext.Provider value={client}>
      <QueryClientProvider client={queryClient} context={optimalQueryContext}>
        {children}
      </QueryClientProvider>
    </OptimalContext.Provider>
  );
};

export const useOptimal = () => {
  const context = useContext(OptimalContext);
  if (!context) {
    throw new Error("useOptimal must be used within an OptimalProvider");
  }
  return context;
};
