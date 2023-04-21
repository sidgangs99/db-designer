import * as Sentry from '@sentry/react';
import { Toaster } from 'react-hot-toast';
import { ReactFlowProvider } from 'reactflow';

import { HotKeys } from 'react-hotkeys';
import { useSaveWorkbook } from './components/hooks/useSaveWorkbook';
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

    const { saveWorkbook } = useSaveWorkbook();

    const isMac = navigator.userAgent.includes('Mac OS X');
    const keyMapping = {
        save: isMac ? 'cmd+s' : 'ctrl+s'
    };

    const KeyMappingHandlers = {
        save: (event: any) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 's') {
                event.preventDefault();
            }
            return saveWorkbook({});
        }
    };

    return (
        <>
            <HotKeys keyMap={keyMapping} handlers={KeyMappingHandlers}>
                <ReactFlowProvider>
                    <div className="flex h-screen w-full fill-white font-serif tracking-wide text-white">
                        <LayoutContainer />
                    </div>
                </ReactFlowProvider>
                <Toaster position="bottom-right" reverseOrder={false} />
            </HotKeys>
        </>
    );
}

export default App;
