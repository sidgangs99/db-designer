import { FiUnlock } from 'react-icons/fi';

function LoginComponent(props: any) {
    const { loginWithGoogle } = props;

    return (
        <div className="flex h-full w-full items-center justify-center bg-grey-darker backdrop-blur">
            <button
                className="flex items-center space-x-4 rounded-xl border bg-grey-dark px-6 py-2 font-medium tracking-wider text-white shadow-md shadow-black hover:animate-none hover:shadow-2xl"
                onClick={loginWithGoogle}
            >
                <FiUnlock />
                <p>Alpha access</p>
            </button>
        </div>
    );
}
export default LoginComponent;
