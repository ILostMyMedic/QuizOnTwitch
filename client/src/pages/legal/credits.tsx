import Container from '../../layout/container';
import Headline from '../../components/headline';


const people = [
    {
        name: 'ILostMyMedic',
        role: 'Developer',
        imageUrl:
            'https://static-cdn.jtvnw.net/jtv_user_pictures/3d25ada6-8226-4f04-a99a-02e3b74f56e6-profile_image-70x70.png',
    },
    
    // More people...
];


const CreditsPage = () => {
    return (
        <Container>
            <Headline headlineText="Special thanks" subHeadlineText="Credits" />

            <ul
                role="list"
                className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
            >
                {people.map((person) => (
                    <a 
                        key={person.name} 
                        className="text-center hover:bg-gray-200 transition-all duration-100 py-4 rounded-md" 
                        href="https://twitch.tv/ilostmymedic"
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <img
                            className="mx-auto h-32 w-32 rounded-full"
                            src={person.imageUrl}
                            alt=""
                        />
                        <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
                            {person.name}
                        </h3>
                        <p className="text-sm leading-6 text-gray-600">{person.role}</p>
                    </a>
                ))}
            </ul>
        </Container>
    );
};

export default CreditsPage;
