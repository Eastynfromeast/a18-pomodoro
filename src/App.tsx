import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { MaxTime, timeState, isRunningState, pomodoroState, IPomodoro } from "./utils/atom";
import styled from "styled-components";
import { motion } from "framer-motion";
import Timer from "./components/Timer";
import TimerButton from "./components/Button";
import Rounds from "./components/Rounds";

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

function App() {
	const [time, setTime] = useRecoilState<number>(timeState);
	const [isRunning, setIsRunning] = useRecoilState(isRunningState);
	const [pomodoro, setPomodoro] = useRecoilState<IPomodoro>(pomodoroState);

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
				if (pomodoro.rounds === MaxTime.ROUNDS - 1) {
					setPomodoro(prev => {
						return {
							rounds: 0,
							goals: prev.goals + 1,
						};
					});
				} else {
					setPomodoro(prev => {
						return {
							...prev,
							rounds: prev.rounds + 1,
						};
					});
				}
			}
		}
	}, [time, pomodoro, isRunning, setTime, setPomodoro, setIsRunning]);

	return (
		<Container>
			<Title>Pomodoro</Title>
			<Wrapper>
				<Timer />
				<TimerButton onClick={isRunning ? onClickStop : onClickStart} />
				<Rounds />
				{pomodoro.goals === MaxTime.GOALS && <p> YAY! You complete today's goal! Congrats!</p>}
			</Wrapper>
		</Container>
	);
}

export default App;
