import { useEffect, useState } from 'react';
import Headline from '../../components/headline';
import Container from '../../layout/container';
import Empty from './components/empty';

const QuizPage = () => {
    const [Quizzes, setQuizzes] = useState([]);

    return (
        <Container>
            <Headline headlineText="Quizzes" />
            {Quizzes.length === 0 ? <Empty /> : <div></div>}
        </Container>
    );
};

export default QuizPage;
