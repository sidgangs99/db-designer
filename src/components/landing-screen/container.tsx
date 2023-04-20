import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';

import useAuthStore from '../../store/firebase/state';
import CommunityComponent from './community/component';
import LandingScreenComponent from './component';
import ContactUsComponent from './contact-us/component';
import HomeComponent from './home/component';
import PricingComponent from './pricing/component';

export default function LandingScreenContainer() {
    const { auth, loginWithGoogle }: any = useAuthStore();
    const [user, loading] = useAuthState(auth);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate('/design');
    }, [user, loading]);

    const pathnameMapping: Record<string, any> = {
        '/contact-us': <ContactUsComponent />,
        '/': <HomeComponent />,
        '/pricing': <PricingComponent />,
        '/community': <CommunityComponent />
    };

    const options = [
        { label: 'About', onClick: () => navigate('/') },
        { label: 'Community', onClick: () => navigate('/community') },
        { label: 'Pricing', onClick: () => navigate('/pricing') },
        { label: 'Contact Us', onClick: () => navigate('/contact-us') },
        { label: 'Log In', onClick: loginWithGoogle }
    ];

    return (
        <LandingScreenComponent
            headerOptions={options}
            bodyComponent={
                pathnameMapping[location?.pathname] || <HomeComponent />
            }
        />
    );
}
