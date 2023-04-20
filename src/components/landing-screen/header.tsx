import { useNavigate } from 'react-router-dom';

export default function LandingScreenHeader(props: any) {
    const { headerOptions } = props;
    const navigate = useNavigate();

    return (
        <div className="flex w-full items-center justify-around">
            <p
                className="mt-3 flex cursor-pointer items-end font-sans text-4xl font-extrabold hover:text-coral-main md:text-6xl"
                onClick={() => navigate('/')}
            >
                KRUD
            </p>
            <div className="flex space-x-24 pt-7">
                {headerOptions.map(({ label, onClick }: any, index: number) => (
                    <div
                        className="cursor-pointer hover:text-coral-light"
                        onClick={onClick}
                        key={index}
                    >
                        {label}
                    </div>
                ))}
            </div>
        </div>
    );
}
