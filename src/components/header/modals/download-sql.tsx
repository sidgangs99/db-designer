import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineDocumentDownload } from 'react-icons/hi';
import { downloadFile } from '../../../util/helper';

import EditorContainer from '../../common/editor/container';
import IconButtonContainer from '../../common/icon-button/container';
import ModalContainer from '../../common/modal/container';
import { useGenerateSqlFile } from '../hooks/useGenerateSqlFile';

interface IDownloadSqlFileModal {
    open: boolean;
    setOpen: any;
}

export default function DownloadSqlFileModal(props: IDownloadSqlFileModal) {
    const { open, setOpen } = props;
    const { data } = useGenerateSqlFile();

    const [fileContent, setFileContent] = useState<string>('');

    const { register, setValue, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues: {
            fileName: 'databaseSchema',
            fileContent: data?.fileContent
        }
    });

    useEffect(() => {
        if (data?.fileContent) {
            setValue('fileContent', data?.fileContent);
            setFileContent(data?.fileContent);
        }
    }, [data]);

    const onSubmit = ({ fileName, fileContent }: any) => {
        downloadFile(fileContent, 'sql', fileName);
    };

    return (
        <ModalContainer
            open={open}
            setOpen={setOpen}
            className={'h-1/2 w-5/12'}
            Body={
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit(onSubmit)}
                    id="sqlFileDownload"
                >
                    <div className="flex flex-row justify-between pr-2">
                        <div className="flex items-end space-x-4">
                            <label className="font-semibold">File Name:</label>
                            <div className="flex space-x-2 font-normal">
                                <input
                                    {...register('fileName', {
                                        required: true
                                    })}
                                    className="outline-border-coral-dark border-b border-coral-dark py-0.5 px-2 font-normal focus:border-coral-darkest focus:outline-none focus:ring-0 dark:bg-stone-900"
                                />
                                <p className="self-end">.sql</p>
                            </div>
                        </div>
                        <IconButtonContainer
                            label={'Download'}
                            Icon={HiOutlineDocumentDownload}
                            type={'submit'}
                            form={'sqlFileDownload'}
                        />
                    </div>
                    <div className="flex w-full space-x-2">
                        <EditorContainer
                            value={fileContent}
                            setValue={setFileContent}
                        />
                    </div>
                </form>
            }
            Footer={
                <div className="flex items-center justify-between space-x-4"></div>
            }
        />
    );
}