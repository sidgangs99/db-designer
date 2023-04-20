import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

export default function HomeComponent() {
    return (
        <ParallaxProvider>
            <div className="flex h-full w-full flex-col items-center justify-center">
                <Parallax scale={[1, 0]} easing="easeInSine">
                    <div className="flex h-screen flex-col items-center justify-center space-x-2 space-y-8 text-4xl md:text-5xl lg:text-6xl 2xl:text-8xl">
                        <div>Worried about designing your DB</div>
                        <div className="text-2xl text-grey-lighter md:text-4xl">
                            One stop solution for all your needs.
                        </div>
                    </div>
                </Parallax>
                <Parallax scale={[1, 0]} easing="easeInSine">
                    <img
                        src="https://ik.imagekit.io/dbDesigner/Screenshot_2023-04-19_at_10.36.21_PM.png?updatedAt=1681926960583"
                        alt="DB - design"
                        className="flex"
                    />
                </Parallax>
                <Parallax scale={[0.5, 1]} easing="easeInSine">
                    <div className="flex h-screen flex-col items-center justify-center text-4xl md:text-6xl">
                        <div>
                            Say goodbye to DB distress, with designs that
                            impress!
                        </div>
                        <div className="flex w-full justify-end pr-10 pt-10 text-2xl text-grey-lighter md:text-4xl">
                            - Nikhil Lad
                        </div>
                    </div>
                </Parallax>
            </div>
        </ParallaxProvider>
    );
}
