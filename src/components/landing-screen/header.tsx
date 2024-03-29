import { useLocation, useNavigate } from 'react-router-dom';

export default function LandingScreenHeader(props: any) {
    const { headerOptions } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const pathnames = ['/', '/community', '/pricing', '/contact-us'];

    return (
        <div className="flex w-full items-center justify-around">
            <p
                className="mt-3 flex cursor-pointer items-end bg-white from-coral-main to-pink-600 bg-clip-text font-sans text-4xl font-extrabold tracking-wide text-transparent hover:bg-gradient-to-r md:text-6xl"
                onClick={() => navigate('/')}
            >
                KRUD
            </p>
            <div className="flex space-x-24 pt-7">
                {headerOptions.map(({ label, onClick }: any, index: number) => (
                    <div
                        className={`cursor-pointer hover:text-coral-light ${
                            location.pathname === pathnames[index] &&
                            'text-coral-light'
                        }`}
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
