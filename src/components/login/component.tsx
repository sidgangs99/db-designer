function LoginComponent(props: any) {
    const { loginWithGoogle } = props;

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
