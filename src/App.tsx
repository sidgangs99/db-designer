import * as Sentry from '@sentry/react';
import { Toaster } from 'react-hot-toast';
import { ReactFlowProvider } from 'reactflow';

import { HotKeys } from 'react-hotkeys';
import { useHotkeys } from './components/hooks/useHotkeys';
import LayoutContainer from './components/layout/container';
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
    const { keyMapping, keyMappingHandlers } = useHotkeys();

    return (
        <>
            <HotKeys keyMap={keyMapping} handlers={keyMappingHandlers}>
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
