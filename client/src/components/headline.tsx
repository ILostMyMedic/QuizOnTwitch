
interface IHeadlineProps {
    headlineText: string;
    headlineIcon?: JSX.Element;
    subHeadlineText?: string;
    className?: string;
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const Headline = (
    { headlineText, headlineIcon, subHeadlineText, className }: IHeadlineProps
) => {
    return (
        <>
            <div className={classNames(`mx-auto max-w-2xl lg:mx-0`, className)}>
                {subHeadlineText && (
                    <p className="text-lg font-semibold leading-8 tracking-tight text-primary">
                        {subHeadlineText}
                    </p>
                )}
                <div className="flex flex-row items-center mt-2 ">
                    {headlineIcon && headlineIcon}
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        {headlineText}
                    </h1>
                </div>
            </div>
        </>
    );
}


export default Headline;