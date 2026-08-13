

import { QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,      // 5 min
      gcTime: 1000 * 60 * 60 * 24,   // 24 hr
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },

    mutations: {
      retry: 1,
    },
  },
});


export default queryClient;