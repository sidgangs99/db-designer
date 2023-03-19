const CustomTableNodeComponent = ({ data }: { data: any }) => {
    return (
        <div className="flex h-full w-full justify-center rounded-md border-2 border-stone-400 bg-white py-2 px-20 shadow-md">
            <div className="text-lg font-bold">{data.tableName}</div>
        </div>
    );
};

export default CustomTableNodeComponent;
