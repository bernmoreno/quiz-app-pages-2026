import { useMemo, useState } from 'react';
import questions from './questions.js';

function App() {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [userAnswers, setUserAnswers] = useState([]);

	const quizIsComplete = currentQuestionIndex >= questions.length;

	const correctAnswersCount = useMemo(() => {
		return userAnswers.reduce((count, answer, index) => {
			if (answer === questions[index].answers[0]) {
				return count + 1;
			}

			return count;
		}, 0);
	}, [userAnswers]);

	function handleSelectAnswer(answer) {
		setUserAnswers((prevAnswers) => [...prevAnswers, answer]);
		setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
	}

	function handleRestart() {
		setCurrentQuestionIndex(0);
		setUserAnswers([]);
	}

	if (quizIsComplete) {
		const score = Math.round((correctAnswersCount / questions.length) * 100);

		return (
			<main id="summary">
				<h2>Quiz Complete!</h2>

				<div id="summary-stats">
					<p>
						<span className="number">{correctAnswersCount}</span>
						<span className="text">Correct</span>
					</p>
					<p>
						<span className="number">{questions.length - correctAnswersCount}</span>
						<span className="text">Missed</span>
					</p>
					<p>
						<span className="number">{score}%</span>
						<span className="text">Score</span>
					</p>
				</div>

				<ol>
					{questions.map((question, index) => {
						const userAnswer = userAnswers[index];
						const isCorrect = userAnswer === question.answers[0];

						return (
							<li key={question.id}>
								<h3>{index + 1}</h3>
								<p className="question">{question.text}</p>
								<p className={`user-answer ${isCorrect ? 'correct' : 'wrong'}`}>
									{userAnswer}
								</p>
							</li>
						);
					})}
				</ol>

				<p id="skip-action">
					<button onClick={handleRestart}>Take the quiz again</button>
				</p>
			</main>
		);
	}

	const activeQuestion = questions[currentQuestionIndex];
	const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100;

	return (
		<>
			<header>
				<h1>React Quiz App</h1>
			</header>

			<main id="quiz">
				<div id="question">
					<p id="question-overview">
						Question {currentQuestionIndex + 1} of {questions.length}
					</p>
					<progress max="100" value={progressValue} />
					<h2>{activeQuestion.text}</h2>

					<ul id="answers">
						{activeQuestion.answers.map((answer) => (
							<li key={answer} className="answer">
								<button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
							</li>
						))}
					</ul>
				</div>
			</main>
		</>
	);
}

export default App;
