import React from 'react';
import { HeartIcon as HeartSolid } from '@heroicons/react/20/solid';
import { HeartIcon as HeatOutline } from '@heroicons/react/24/outline';
import { Button } from '../../../components/button';
import { Text } from '../../../components/text';

let DEFAULT = [
    {
        id: 1,
        name: 'Basic Tee 8-Pack',
        href: '#',
        price: '$256',
        description:
            'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
        options: '8 colors',
        imageSrc: 'https://placehold.co/600x400/EEE/31343C',
        imageAlt:
            'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
        liked: false,
        likes: 47832687,
    },
    {
        id: 2,
        name: 'Basic Tee',
        href: '#',
        price: '$32',
        description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
        options: 'Black',
        imageSrc: 'https://placehold.co/600x400/EEE/31343C',
        imageAlt: 'Front of plain black t-shirt.',
        liked: false,
        likes: 47832687,
    },
    {
        id: 3,
        name: 'Basic Tee',
        href: '#',
        price: '$32',
        description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
        options: 'Black',
        imageSrc: 'https://placehold.co/600x400/EEE/31343C',
        imageAlt: 'Front of plain black t-shirt.',
        liked: true,
        likes: 47832687,
    },
    {
        id: 4,
        name: 'Basic Tee',
        href: '#',
        price: '$32',
        description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
        options: 'Black',
        imageSrc: 'https://placehold.co/600x400/EEE/31343C',
        imageAlt: 'Front of plain black t-shirt.',
        liked: false,
        likes: 47832687,
    },
    {
        id: 5,
        name: 'Basic Tee',
        href: '#',
        price: '$32',
        description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
        options: 'Black',
        imageSrc: 'https://placehold.co/600x400/EEE/31343C',
        imageAlt: 'Front of plain black t-shirt.',
        liked: true,
        likes: 47832687,
    },
    {
        id: 6,
        name: 'Basic Tee',
        href: '#',
        price: '$32',
        description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
        options: 'Black',
        imageSrc: 'https://placehold.co/600x400/EEE/31343C',
        imageAlt: 'Front of plain black t-shirt.',
        liked: false,
        likes: 47832687,
    },
    {
        id: 7,
        name: 'Basic Tee',
        href: '#',
        price: '$32',
        description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
        options: 'Black',
        imageSrc: 'https://placehold.co/600x400/EEE/31343C',
        imageAlt: 'Front of plain black t-shirt.',
        liked: false,
        likes: 47832687,
    },
];

/**
 * Dice rating / star rating
 * 1-10 ration
 * percentage rating
 */

const Preview = () => {
    const [products, setProducts] = React.useState(DEFAULT);

    const convertLikes = (likes: number) => {
        if (likes < 1000) {
            return likes;
        }
        if (likes < 1000000) {
            return `${(likes / 1000).toFixed(1)}k`;
        }
        return `${(likes / 1000000).toFixed(1)}m`;
    };

    return (
        <div className="">
            <div className="mx-auto max-w-8xl px-4 pb-4 sm:pb-10 lg:pb-8 sm:px-6 lg:max-w-8xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-white/10 bg-container-light dark:bg-container-dark"
                        >
                            <div className="aspect-h-4 aspect-w-3 bg-container-light dark:bg-container-dark sm:aspect-none group-hover:opacity-75 sm:h-56">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                                />
                            </div>
                            <div className="flex flex-1 flex-col space-y-2 p-4">
                                <Text className="text-base sm:text-base font-medium text-gray-900">
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0 pointer-events-none"
                                    />
                                    {product.name}
                                </Text>
                                <Text className="text-sm sm:text-sm">{product.description}</Text>
                                <div className="flex flex-1 flew-row items-center w-full">
                                    <button
                                        className="flex flex-row justify-start items-center gap-2 h-full"
                                        onClick={() => {
                                            // find and replace the liked status
                                            const newProducts = products.map((p) => {
                                                if (p.id === product.id) {
                                                    return {
                                                        ...p,
                                                        liked: !p.liked,
                                                    };
                                                }
                                                return p;
                                            });

                                            setProducts(newProducts);
                                        }}
                                    >
                                        {product.liked ? (
                                            <HeartSolid className="text-red-500 w-6" />
                                        ) : (
                                            <HeatOutline className="text-gray-500 w-6" />
                                        )}
                                        <p className="text-sm italic text-gray-500">
                                            {convertLikes(product.likes)} likes
                                        </p>
                                    </button>
                                    <div className="flex flex-1 justify-end">
                                        <Button
                                            className="rounded-md bg-gray-900 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                                        >
                                            Play
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Preview;
