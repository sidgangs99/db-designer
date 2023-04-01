import { FiUnlock } from 'react-icons/fi';

function LoginComponent(props: any) {
    const { loginWithGoogle } = props;

    return (
        <div className="flex h-full w-full items-center justify-center bg-secondary-100 backdrop-blur dark:bg-primary-900">
            <button
                className="flex items-center space-x-4 rounded-xl border border-secondary-800 bg-secondary-200 px-6 py-2 font-medium tracking-wider text-primary-800 shadow-md hover:animate-none hover:bg-secondary-300 hover:shadow-2xl dark:border-secondary-500 dark:bg-primary-800 dark:text-secondary-100 dark:hover:bg-primary-700"
                onClick={loginWithGoogle}
            >
                <FiUnlock />
                <p>Alpha access</p>
            </button>
        </div>
    );
}
export default LoginComponent;
