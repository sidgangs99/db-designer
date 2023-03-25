import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomeContainer from '../home/container';
import LoginContainer from '../login/container';
import { ProtectedRoute } from '../protected-route/component';

import { ILayoutComponentProps } from './types';

export default function LayoutComponent(props: ILayoutComponentProps) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate replace to="/login" />}
                    />
                    <Route
                        path="/design"
                        element={<ProtectedRoute Component={HomeContainer} />}
                    />
                    <Route path="/login" element={<LoginContainer />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}
