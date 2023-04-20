import * as Sentry from '@sentry/react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactFlowProvider } from 'reactflow';

import LayoutContainer from './components/layout/container';
import { darkTheme, lightTheme } from './store/darkMode/constants';
import { useThemeStore } from './store/darkMode/state';
import { getEnvVariable } from './util/helper';

Sentry.init({
    dsn: getEnvVariable('VITE_SENTRY_DSN'),
    integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0 // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

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
        <>
            <QueryClientProvider client={queryClient}>
                <ReactFlowProvider>
                    <div className="flex h-screen w-full fill-white font-serif tracking-wide text-white">
                        <LayoutContainer />
                    </div>
                </ReactFlowProvider>
                <Toaster position="bottom-right" reverseOrder={false} />
            </QueryClientProvider>
        </>
    );
}

export default App;
