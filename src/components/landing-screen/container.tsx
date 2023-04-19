import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import useAuthStore from '../../store/firebase/state';
import LandingScreenComponent from './component';

export default function LandingScreenContainer() {
    const { auth, loginWithGoogle }: any = useAuthStore();
    const [user, loading] = useAuthState(auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate('/design');
    }, [user, loading]);

    const options = [
        { label: 'About' },
        { label: 'Community' },
        { label: 'Pricing' },
        { label: 'Contact Us' },
        { label: 'Log In', onClick: loginWithGoogle }
    ];

    return <LandingScreenComponent headerOptions={options} />;
}
