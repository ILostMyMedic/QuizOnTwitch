import { PlusIcon } from '@heroicons/react/20/solid';


export interface IButtonDividerProps {
    buttonText: string;
    buttonIcon?: JSX.Element;
    onClick: () => void;
}

const ButtonDivider = (
    { buttonText, buttonIcon, onClick }: IButtonDividerProps
) => {
    return (
        <div className="relative mb-10">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300 dark:border-slate-600/40" />
            </div>
            <div className="relative flex justify-center">
                <button
                    type="button"
                    className="inline-flex items-center gap-x-1.5 rounded-full bg-container-dark px-3 py-1.5 text-sm font-semibold text-white shadow-md ring-1 ring-inset ring-gray-900 hover:bg-gray-700"
                    onClick={onClick}
                >
                    {/* {buttonIcon && buttonIcon} */}
                    {buttonIcon ? (
                        buttonIcon
                    ) : (
                        <PlusIcon
                            className="-ml-1 -mr-0.5 h-5 w-5 text-gray-200"
                            aria-hidden="true"
                        />
                    )}

                    {buttonText}
                </button>
            </div>
        </div>
    );
}


export default ButtonDivider;