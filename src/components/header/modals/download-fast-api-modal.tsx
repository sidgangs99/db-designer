import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineDocumentDownload } from 'react-icons/hi';
import { downloadFile } from '../../../util/helper';

import EditorContainer from '../../common/editor/container';
import IconButtonContainer from '../../common/icon-button/container';
import ModalContainer from '../../common/modal/container';
import { useGenerateFastApiModal } from '../../hooks/useGenerateFastApiModal';

interface IDownloadFastApiModal {
    open: boolean;
    setOpen: any;
}

export default function DownloadFastApiModal(props: IDownloadFastApiModal) {
    const { open, setOpen } = props;
    const { data, isFetching } = useGenerateFastApiModal();

    const [fileContent, setFileContent] = useState<string>('');

    const { register, setValue, handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues: {
            fileName: 'dataModal',
            fileContent: data?.fileContent
        }
    });

    const errorMessage =
        'Error: 500 Internal Server Error, will be fixed soon...';
    useEffect(() => {
        if (isFetching) {
            setFileContent('');
        } else {
            if (data?.fileContent) {
                setValue('fileContent', data?.fileContent);
                setFileContent(data?.fileContent);
            } else {
                setFileContent(errorMessage);
            }
        }
    }, [data, isFetching]);

    const onSubmit = ({ fileName, fileContent }: any) => {
        downloadFile(fileContent, 'py', fileName);
    };

    return (
        <ModalContainer
            open={open}
            setOpen={setOpen}
            className={'lg:6/12 h-full w-full lg:h-1/2 xl:w-7/12'}
            Body={
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit(onSubmit)}
                    id="fastApiModalDownload"
                >
                    <div className="flex flex-row justify-between text-xs md:pr-2 md:text-base">
                        <div className="flex items-end space-x-4">
                            <label className="font-semibold text-grey-light">
                                File Name:
                            </label>
                            <div className="flex space-x-2 font-normal">
                                <input
                                    {...register('fileName', {
                                        required: true
                                    })}
                                    className="outline-border-coral-dark focus:border-coral-darkest border-b border-grey-main bg-stone-900 px-2 font-normal text-white focus:outline-none focus:ring-0"
                                />
                                <p className="self-end text-grey-light">.py</p>
                            </div>
                        </div>
                        <IconButtonContainer
                            label={'Download'}
                            Icon={HiOutlineDocumentDownload}
                            type={'submit'}
                            form={'fastApiModalDownload'}
                        />
                    </div>
                    <div className="flex w-full space-x-2">
                        <EditorContainer
                            value={fileContent}
                            setValue={setFileContent}
                            mode='python'
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
