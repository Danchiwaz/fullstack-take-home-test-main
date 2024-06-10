import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProvidersProps {
    children: ReactNode;
}

const createQueryClient = (() => {
    let client: QueryClient;
    return () => {
        if (!client) {
            client = new QueryClient();
        }
        return client;
    };
})();

const Providers = ({ children }: ProvidersProps) => {
    return (
        <QueryClientProvider client={createQueryClient()}>
            {children}
        </QueryClientProvider>
    );
};

export default Providers;
