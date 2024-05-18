import React from "react";
import { Text } from "../../../components/text";
import { Button } from "../../../components/button";
import {
	Dialog,
	DialogTitle,
	DialogDescription,
	DialogBody,
} from "../../../components/dialog";

const DeleteAccount: React.FC = () => {
	const [open, setOpen] = React.useState(false);

	const handleDialog = () => setOpen(!open);

	const DialogBox = () => {
		return (
			<Dialog open={open} onClose={handleDialog}>
				<DialogTitle>You are about to delete your account</DialogTitle>
				<DialogDescription>
					Are you sure you want to delete your account? This action is
					not reversible. All information related to this account will
					be deleted permanently within 48 hours.
				</DialogDescription>
				<DialogBody>
					<form className="flex items-center">
						<Button color="red" onClick={handleDialog}>
							Yes, delete my account
						</Button>
					</form>
				</DialogBody>
			</Dialog>
		);
	};

	return (
		<>
			<DialogBox />
			<div className="grid max-w-8xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
				<div>
					<h2 className="font-semibold leading-7 text-gray-900 text-lg">
						Delete account
					</h2>
					<Text>
						No longer want to use our service? You can delete your
						account here. This action is not reversible. All
						information related to this account will be deleted
						permanently.
					</Text>
				</div>

				<form className="flex items-center md:col-span-2">
					<Button
						// className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
						color="red"
						onClick={handleDialog}
					>
						Delete my account
					</Button>
				</form>
			</div>
		</>
	);
};

export default DeleteAccount;
