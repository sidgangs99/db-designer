import { saveAs } from 'file-saver';
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
