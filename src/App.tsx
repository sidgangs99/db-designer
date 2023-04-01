import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactFlowProvider } from 'reactflow';
import { useStore } from 'zustand';

import LayoutContainer from './components/layout/container';
import { darkTheme, lightTheme } from './store/darkMode/constants';
import { useThemeStore } from './store/darkMode/state';

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 1,
                refetchOnWindowFocus: false
            }
        }
    });

    const userTheme = localStorage.getItem('userTheme');
    const { theme, updateTheme }: any = useStore(useThemeStore);

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
                <div className="flex h-screen w-full border-black fill-black text-black dark:border-slate-200 dark:fill-white dark:text-white">
                    <LayoutContainer />
                </div>
            </ReactFlowProvider>
            <Toaster position="bottom-right" reverseOrder={false} />
        </QueryClientProvider>
    );
}

export default App;
