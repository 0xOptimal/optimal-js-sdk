import { createContext, useContext, type ReactNode } from "react";
import { Platform, type AppStateStatus } from "react-native";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";

import { OptimalClient, type OptimalConfig } from "@getoptimal/js-sdk";

import { useAppState } from "./use-app-state";
import { useOnlineManager } from "./use-online-manager";

type OptimalContextValue = OptimalClient;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});

export const OptimalContext = createContext<OptimalContextValue | null>(null);
export const optimalQueryContext = createContext<QueryClient | undefined>(
  undefined,
);

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export const OptimalProvider = ({
  config,
  children,
}: {
  config?: OptimalConfig;
  children?: ReactNode;
}) => {
  const client = new OptimalClient(config);

  useOnlineManager();
  useAppState(onAppStateChange);

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
