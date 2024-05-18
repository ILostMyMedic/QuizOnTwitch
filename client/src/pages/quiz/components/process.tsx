import { Text } from '../../../components/text';
import { clsx } from 'clsx';


interface ISteps {
    name: string;
    percentage: number;
}

const Process = (
    {step}: {step: number}
) => {

    // if steps is less than 1, set 1
    if (step < 1) step = 1;
    if (step > 4) step = 4;
    step = Math.round(step);

    const steps: ISteps[] = [
        { name: 'Basic information', percentage: 0 },
        { name: 'Adding collaborators', percentage: 37.5 },
        { name: 'Adding questions', percentage: 62.5 },
        { name: 'Ready to play!', percentage: 100 }
    ]
    

    return (
        <div>
            <div className="mt-6" aria-hidden="true">
                <div className="overflow-hidden rounded-full bg-gray-200 dark:bg-container-dark">
                    <div className="h-2 rounded-full bg-primary" 
                    style={{ width: `${steps[step - 1].percentage}%` }}
                    />
                </div>
                <div className="mt-6 hidden grid-cols-4 text-sm font-medium sm:grid">
                    {
                        steps.map((curr, index) => (
                            <div className={
                                clsx(
                                    step > index && 'text-primary',
                                    index === 0 && 'text-left',
                                    index === steps.length - 1 && 'text-right',
                                    index !== 0 && index !== steps.length - 1 && 'text-center',
                                )
                            } key={index}>
                                <Text>{curr.name}</Text>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}


export default Process;