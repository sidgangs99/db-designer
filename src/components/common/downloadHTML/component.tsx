import { toPng } from 'html-to-image';
import { RiCamera3Fill } from 'react-icons/ri';

function downloadImage(dataUrl: string) {
    const a = document.createElement('a');

    a.setAttribute('download', 'db-cult.png');
    a.setAttribute('href', dataUrl);
    a.click();
}

function DownloadButton() {
    const onClick = () => {
        const reactFlowEl = document.querySelector(
            '.react-flow'
        ) as HTMLElement;
        if (!reactFlowEl) {
            console.error('React Flow element not found.');
            return;
        }

        toPng(reactFlowEl, {
            filter: (node) => {
                // we don't want to add the minimap and the controls to the image
                if (
                    node?.classList?.contains('react-flow__minimap') ||
                    node?.classList?.contains('react-flow__controls')
                ) {
                    return false;
                }

                return true;
            }
        }).then(downloadImage);
    };

    return (
            <RiCamera3Fill className="m-1.5 fill-chelsea-cucumber-500 text-base" onClick={onClick}/>
    );
}

export default DownloadButton;
