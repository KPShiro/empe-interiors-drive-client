import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from 'react-router';

const queryClient = new QueryClient({});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="sr-only">
                architekt wnętrz Radom, Warszawa, Kielce, Lublin, Kraków, projektant wnętrz, projekt
                wnętrza, studio projektowania wnętrz, biuro projektowe, wizualizacje wnętrz
            </div>
            <Outlet />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
