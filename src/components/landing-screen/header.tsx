import { useNavigate } from 'react-router-dom';

export default function LandingScreenHeader(props: any) {
    const { headerOptions } = props;
    const navigate = useNavigate();

    return (
        <div className="flex w-full items-center justify-around">
            <p
                className="cursor-pointer text-6xl font-extrabold hover:text-coral-main"
                onClick={() => navigate('/')}
            >
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
