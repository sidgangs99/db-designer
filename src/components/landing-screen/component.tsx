import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

import LandingScreenHeader from './header';

export default function LandingScreenComponent(props: any) {
    const { headerOptions } = props;
    return (
        <div className="flex h-full w-full flex-col bg-grey-darker">
            <div className="fixed z-10 flex h-24 w-full border-b border-grey-light bg-grey-darker">
                <LandingScreenHeader headerOptions={headerOptions} />
            </div>
            <ParallaxProvider>
                <div className="flex flex-col items-center justify-center bg-grey-darker pb-52">
                    <Parallax scale={[1, 0]} easing="easeInQuad">
                        <p className="flex h-screen flex-col items-center justify-center space-x-2 text-6xl font-bold">
                            Worried about designing your DB !!!
                        </p>
                    </Parallax>
                    <Parallax scale={[1, 0]} easing="easeInSine">
                        <img
                            src="https://ik.imagekit.io/dbDesigner/Screenshot_2023-04-19_at_10.36.21_PM.png?updatedAt=1681926960583"
                            alt="DB - design"
                            className="flex"
                        />
                    </Parallax>
                    <Parallax scale={[0.5, 1]} easing="easeInSine">
                        <p className="flex h-screen flex-col items-center justify-center text-6xl font-bold">
                            <p>
                                Say goodbye to DB distress, with designs that
                                impress!
                            </p>
                            <p className="flex w-full justify-end pr-10 pt-10 text-4xl">
                                - Developers
                            </p>
                        </p>
                    </Parallax>
                </div>
            </ParallaxProvider>
        </div>
    );
}
