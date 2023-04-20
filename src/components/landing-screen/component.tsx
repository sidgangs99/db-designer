import LandingScreenHeader from './header';

export default function LandingScreenComponent(props: any) {
    const { headerOptions, bodyComponent } = props;

    return (
        <div className="flex h-full w-full flex-col bg-grey-darker">
            <div className="fixed z-10 flex h-24 w-full border-b border-grey-light bg-grey-darker">
                <LandingScreenHeader headerOptions={headerOptions} />
            </div>
            <div className="flex w-full items-center justify-center bg-grey-darker">
                {bodyComponent}
            </div>
        </div>
    );
}
