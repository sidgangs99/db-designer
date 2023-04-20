import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';

import { HashLoader } from 'react-spinners';
import useAuthStore from '../../store/firebase/state';
import LoaderComponent from '../common/loader/component';
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
        {
            label: 'Log In',
            onClick: user
                ? () => {
                      navigate('/design');
                  }
                : async () => {
                      loginWithGoogle().then(() => navigate('/design'));
                  }
        }
    ];

    return loading ? (
        <LoaderComponent Component={HashLoader} speedMultiplier={0.4} />
    ) : (
        <LandingScreenComponent
            headerOptions={options}
            bodyComponent={
                pathnameMapping[location?.pathname] || <HomeComponent />
            }
        />
    );
}
