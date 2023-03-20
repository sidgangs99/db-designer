const CustomTableNodeComponent = ({ data }: { data: any }) => {

    return (
        <div className="flex h-full w-full justify-center rounded-md bg-chelsea-cucumber-100 py-2 px-2 shadow-lg outline-2 outline-stone-400">
            <div className="text-lg font-bold uppercase text-chelsea-cucumber-600">
                {data.tableName}
            </div>
        </div>
    );
};

export default CustomTableNodeComponent;
