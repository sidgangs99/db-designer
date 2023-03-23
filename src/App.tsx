import { ReactFlowProvider } from 'reactflow';

import LayoutContainer from './components/layout/container';

function App() {
    return (
        <ReactFlowProvider>
            <div className="flex h-screen w-full">
                <LayoutContainer />
            </div>
        </ReactFlowProvider>
    );
}

export default App;
