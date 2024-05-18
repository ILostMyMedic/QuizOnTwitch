const Divider = () => {
    return (
        <div className="relative my-6 pb-4">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-2 border-gray-300" />
            </div>
        </div>
    );
};

const LabelDivider = ({ label, id }: { label: string; id: string }) => {
    return (
        <div className="relative py-4 mt-4" id={id}>
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-start">
                <span className="pr-3 text-base font-semibold leading-6 text-gray-400 bg-[#f5f5f5]">
                    {label}
                </span>
            </div>
        </div>
    );
};

export { Divider, LabelDivider };
