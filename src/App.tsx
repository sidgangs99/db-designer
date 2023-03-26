import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactFlowProvider } from 'reactflow';

import LayoutContainer from './components/layout/container';

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 1,
                refetchOnWindowFocus: false
            }
        }
    });

    return (
        <QueryClientProvider client={queryClient}>
            <ReactFlowProvider>
                <div className="flex h-screen w-full">
                    <LayoutContainer />
                </div>
            </ReactFlowProvider>
        </QueryClientProvider>
    );
}

export default App;
