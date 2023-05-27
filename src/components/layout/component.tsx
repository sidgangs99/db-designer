import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import LoaderComponent from '../common/loader/component';
import HomeContainer from '../home/container';
import { ProtectedRoute } from '../protected-route/component';

import LandingScreenContainer from '../landing-screen/container';
import { ILayoutComponentProps } from './types';

export default function LayoutComponent(props: ILayoutComponentProps) {
    return (
        <Suspense
            fallback={
                <LoaderComponent
                    Component={HashLoader}
                    // color={customColors.astronaut[300]}
                    speedMultiplier={0.4}
                />
            }
        >
            <BrowserRouter>
                <Routes>
                    {/* <Route
                        path="/"
                        element={<Navigate replace to="/" />}
                    /> */}
                    <Route path="/" element={<LandingScreenContainer />} />
                    <Route path="/about" element={<LandingScreenContainer />} />
                    <Route
                        path="/contact-us"
                        element={<LandingScreenContainer />}
                    />
                    <Route
                        path="/pricing"
                        element={<LandingScreenContainer />}
                    />
                    <Route
                        path="/community"
                        element={<LandingScreenContainer />}
                    />

                    <Route
                        path="/design/*"
                        element={<ProtectedRoute Component={HomeContainer} />}
                    />
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}
