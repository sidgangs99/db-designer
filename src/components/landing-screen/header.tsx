export default function LandingScreenHeader(props: any) {
    const { headerOptions } = props;
    return (
        <div className="flex w-full items-center justify-around">
            <p className="text-6xl font-extrabold hover:text-coral-main">
                KRUK
            </p>
            <div className="flex space-x-24 pt-7">
                {headerOptions.map(({ label, onClick }: any) => (
                    <div
                        className="cursor-pointer hover:text-coral-light"
                        onClick={onClick}
                    >
                        {label}
                    </div>
                ))}
            </div>
        </div>
    );
}
