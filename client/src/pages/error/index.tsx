import Error401 from './401';
import Error403 from './403';
import Error404 from './404';


const ErrorPage: React.FC = (props: any) => {
	const { errorCode } = props;

	switch (errorCode) {
		case 401:
			return <Error401 />;
		case 403:
			return <Error403 />;
		case 404:
			return <Error404 />;
		default:
			return <Error404 />;
	}
}

export default ErrorPage;