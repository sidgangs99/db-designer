import { FiUnlock } from 'react-icons/fi';

function LoginComponent(props: any) {
    const { loginWithGoogle } = props;

    return (
        <div className="bg-secondary-100 bg-primary-900 flex h-full w-full items-center justify-center backdrop-blur">
            <button
                className="border-secondary-800 bg-secondary-200 text-primary-800 hover:bg-secondary-300 border-secondary-500 bg-primary-800 text-secondary-100 hover:bg-primary-700 flex items-center space-x-4 rounded-xl border px-6 py-2 font-medium tracking-wider shadow-md hover:animate-none hover:shadow-2xl"
                onClick={loginWithGoogle}
            >
                <FiUnlock />
                <p>Alpha access</p>
            </button>
        </div>
    );
}
export default LoginComponent;
