import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactFlowProvider } from 'reactflow';

import LayoutContainer from './components/layout/container';
import { darkTheme, lightTheme } from './store/darkMode/constants';
import { useThemeStore } from './store/darkMode/state';

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: (failureCount, error: any) => {
                    if (error?.response?.status === 401 && failureCount === 0) {
                        return true;
                    }
                    return false;
                },
                refetchOnWindowFocus: false
            }
        }
    });

    const userTheme = localStorage.getItem('userTheme');
    const { theme, updateTheme }: any = useThemeStore();

    if (theme !== userTheme) {
        if (userTheme === lightTheme) {
            updateTheme(lightTheme);
        } else if (userTheme === darkTheme) {
            updateTheme(darkTheme);
        } else {
            // localStorage.setItem('userTheme', darkTheme);
        }
    } else if (!userTheme) {
        updateTheme(darkTheme);
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ReactFlowProvider>
                <div className="flex h-screen w-full fill-white text-white">
                    <LayoutContainer />
                </div>
            </ReactFlowProvider>
            <Toaster position="bottom-right" reverseOrder={false} />
        </QueryClientProvider>
    );
}

export default App;
