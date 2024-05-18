export const Loading = () => {
	return <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-primary"></div>;
}

export const LoadingSmall = () => {	
	return (
		<div className="flex items-center justify-center">
			<Loading />
		</div>
	)
}

const LoadingFull = () => {
	return (
        <div className="flex items-center justify-center h-screen">
            <Loading />
        </div>
    );
};

export default LoadingFull;
