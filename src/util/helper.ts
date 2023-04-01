import { saveAs } from 'file-saver';
import { toPng } from 'html-to-image';
import { v4 as uuidv4 } from 'uuid';

export const uuid = () => uuidv4();

export function downloadFile(
    content: string,
    extension: string,
    name = 'dbDesign'
) {
    const sqlBlob = new Blob([content], { type: 'text/sql' });
    saveAs(sqlBlob, `${name}.${extension}`);
}

export function downloadImage(dataUrl: string) {
    const a = document.createElement('a');

    a.setAttribute('download', 'db-cult.png');
    a.setAttribute('href', dataUrl);
    a.click();
}

export function downloadPngImageOfWorkbook() {
    const reactFlowEl = document.querySelector('.react-flow') as HTMLElement;
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
}