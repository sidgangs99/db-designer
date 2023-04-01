import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineDocumentDownload } from 'react-icons/hi';
import { downloadFile } from '../../../util/helper';

import EditorContainer from '../../common/editor/container';
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
                        <div className="flex items-center space-x-4">
                            <label className="font-semibold">File Name:</label>
                            <div className="flex space-x-2 font-normal">
                                <input
                                    {...register('fileName', {
                                        required: true
                                    })}
                                    className="rounded-lg border border-chelsea-cucumber-400 py-1 px-2 font-normal outline-chelsea-cucumber-400"
                                />
                                <p className="self-end">.sql</p>
                            </div>
                        </div>
                        <button
                            form="sqlFileDownload"
                            type="submit"
                            className="flex cursor-pointer items-center justify-center space-x-2 rounded-lg border border-chelsea-cucumber-600 bg-white px-2 py-1 text-chelsea-cucumber-600  hover:border-chelsea-cucumber-700 hover:bg-chelsea-cucumber-200"
                        >
                            <HiOutlineDocumentDownload className="text-lg" />
                            <p>Download</p>
                        </button>
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
