import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { MaxTime, goalState, roundState, timeState, isRunningState } from "./atom";
import styled from "styled-components";
import { motion } from "framer-motion";
import Timer from "./components/Timer";
import TimerButton from "./components/Button";

const Container = styled.div`
	margin: 0 auto;
	max-width: 480px;
	height: 100vh;
	font-size: 24px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-family: "Press Start 2P", system-ui;
`;

const Title = styled.h1`
	font-size: 1.5em;
	padding-bottom: 45px;
	text-align: center;
	text-transform: uppercase;
	letter-spacing: 4px;
`;

const Wrapper = styled(motion.div)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Buttons = styled(motion.div)`
	display: flex;
	justify-content: center;
	margin: 45px auto;
`;

const Button = styled(motion.button)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100px;
	height: 100px;
	border-radius: 100%;
	background-color: ${props => props.theme.textColor};
	color: ${props => props.theme.bgColor};
	svg {
		width: 80%;
		text-align: center;
	}
`;

const Rounds = styled(motion.ul)`
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	text-align: center;
`;

const Round = styled(motion.li)`
	display: inline-flex;
	flex-direction: column;
	gap: 15px;
	max-width: 50%;
	text-transform: uppercase;
	font-weight: 600;
	font-size: 1em;
`;

const RoundGoal = styled(motion.p)`
	color: rgba(255, 255, 255, 1);
	letter-spacing: -0.3em;
`;

function App() {
	const [time, setTime] = useRecoilState<number>(timeState);
	const [round, setRound] = useRecoilState<number>(roundState);
	const [goal, setGoal] = useRecoilState<number>(goalState);
	const [isRunning, setIsRunning] = useRecoilState(isRunningState);

	const timerRef = useRef<any>();

	const onClickStart = () => {
		if (!isRunning) {
			setIsRunning(true);
			timerRef.current = setInterval(() => {
				setTime(prev => {
					if (time === 0) {
						setIsRunning(false);
					}
					return prev - 1;
				});
			}, 1000);
		}
	};

	const onClickStop = () => {
		setIsRunning(false);
		clearInterval(timerRef.current);
	};

	useEffect(() => {
		if (isRunning) {
			if (time === 0) {
				clearInterval(timerRef.current);
				setTime(MaxTime.TIME);
				setIsRunning(false);
				if (round === MaxTime.ROUNDS - 1) {
					setRound(0);
					setGoal(prev => prev + 1);
				} else {
					setRound(prev => prev + 1);
				}
			}
		}
	}, [time, round, goal, isRunning, setTime, setRound, setGoal, setIsRunning]);

	return (
		<Container>
			<Title>Pomodoro</Title>
			<Wrapper>
				<Timer time={time} />
				<Buttons>
					<TimerButton onClick={isRunning ? onClickStop : onClickStart} />
				</Buttons>
				<Rounds>
					<Round>
						<RoundGoal>{`${round} / ${MaxTime.ROUNDS}`}</RoundGoal>
						<span>Round</span>
					</Round>
					<Round>
						<RoundGoal>{`${goal} / ${MaxTime.GOALS}`}</RoundGoal>
						<span>Goal</span>
					</Round>
				</Rounds>
				{goal === MaxTime.GOALS && <p> YAY! You complete today's goal! Congrats!</p>}
			</Wrapper>
		</Container>
	);
}

export default App;
