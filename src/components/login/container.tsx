import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';

import { useAuthStore } from '../../store/firebase/state';
import LoginComponent from './component';

export default function LoginContainer(props: any) {
    const { auth, loginWithGoogle }: any = useStore(useAuthStore);
    const [user, loading] = useAuthState(auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate('/design');
    }, [user, loading]);

    return <LoginComponent loginWithGoogle={loginWithGoogle} />;
}
