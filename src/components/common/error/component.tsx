export default function ErrorComponent({ message }: { message: string }) {
    return (
        <div
            className={`flex w-full items-center justify-center bg-grey-darker `}
        >
            {message}
        </div>
    );
}
