import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';

import { useAuthStore } from '../../store/firebase/state';

import './styles.css';

function LoginComponent() {
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

    return (
        <div className=" flex h-full w-full items-center justify-center bg-chelsea-cucumber-100 backdrop-blur">
            <button
                className="animate-pulse rounded-xl border bg-white px-10 py-2 font-medium tracking-wider text-chelsea-cucumber-900  shadow-2xl hover:animate-none"
                onClick={loginWithGoogle}
            >
                Alpha access
            </button>
        </div>
    );
}
export default LoginComponent;
