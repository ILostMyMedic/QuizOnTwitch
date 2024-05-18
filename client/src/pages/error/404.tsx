import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
	PuzzlePieceIcon,
	MagnifyingGlassIcon,
	TrophyIcon
} from "@heroicons/react/24/solid";
import routes from "../../routes/paths";
import { Link } from "react-router-dom";
import rocket from "../../assets/images/initialsLogo.svg";

const links = [
    {
        name: 'Join Quizzes',
        href: '#',
        description: 'Join and compete in quizzes to earn rewards.',
        icon: PuzzlePieceIcon,
    },
    {
        name: 'Discover',
        href: '#',
        description: 'Discover new quizzes and challenges.',
        icon: MagnifyingGlassIcon,
    },
    {
        name: 'Leaderboard',
        href: '#',
        description: 'Compete for a spot on the leaderboard.',
        icon: TrophyIcon,
    },
];
const Error404: React.FC = () => {
	return (
		<div>
			<main className="mx-auto w-full max-w-8xl px-6 pb-16 pt-10 sm:pb-24 lg:px-8">
				<img
					className="mx-auto h-10 w-auto sm:h-16"
					src={rocket}
					alt="Medic.gg"
				/>
				<div className="mx-auto mt-10 max-w-2xl text-center sm:mt-10">
					<p className="text-xl font-semibold leading-8 text-primary">
						404
					</p>
					<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
						This page does not exist
					</h1>
					<p className="mt-4 text-base leading-7 text-gray-800 sm:mt-6 sm:text-lg sm:leading-8">
						Sorry, we couldn’t find the page you’re looking for.
					</p>
				</div>
				<div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
					<h2 className="sr-only text-primary">Resources</h2>
					<ul
						role="list"
						className="-mt-6 divide-y divide-gray-900/5 border-b border-gray-900/5"
					>
						{links.map((link, linkIdx) => (
							<li
								key={linkIdx}
								className="relative flex gap-x-6 py-6"
							>
								<div className="flex h-10 w-10 flex-none items-center justify-center">
									<link.icon
										className="h-6 w-6 text-primary"
										aria-hidden="true"
									/>
								</div>
								<div className="flex-auto">
									<h3 className="text-sm font-semibold leading-6 text-gray-900">
										<a href={link.href}>
											<span
												className="absolute inset-0"
												aria-hidden="true"
											/>
											{link.name}
										</a>
									</h3>
									<p className="mt-2 text-sm leading-6 text-gray-600">
										{link.description}
									</p>
								</div>
								<div className="flex-none self-center">
									<ChevronRightIcon
										className="h-5 w-5 text-p-200"
										aria-hidden="true"
									/>
								</div>
							</li>
						))}
					</ul>
					<div className="mt-10 flex justify-center">
						<Link
							to={routes.root}
							className="text-sm font-semibold leading-6 text-primary"
						>
							<span aria-hidden="true">&larr;</span>
							Back to home
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Error404;