import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IPomodoro, MaxTime, goalState, pomodoroState, roundState, timeState } from "./atom";

const Container = styled.div`
	margin: 0 auto;
	max-width: 480px;
	display: flex;
	flex-direction: column;
`;

const Title = styled.h1`
	font-size: 48px;
	padding: 30px 0;
	text-align: center;
`;

const Wrapper = styled(motion.div)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Timer = styled(motion.ul)`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	font-size: 36px;
	gap: 10px;
`;

const TimerBox = styled(motion.li)`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.theme.textColor};
	color: ${props => props.theme.bgColor};
	padding: 50px 25px;
	font-weight: 600;
	border-radius: 15px;
`;

const Buttons = styled(motion.div)`
	display: flex;
	justify-content: center;
	margin: 45px auto;
`;

const Col = styled(motion.ul)`
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-items: center;
	text-align: center;
`;

const ColItem = styled(motion.li)`
	display: inline-flex;
	flex-direction: column;
	max-width: 50%;
`;

const set2digits = (n: number | string) => {
	if ((n as number) < 10) n = n.toString().padStart(2, "0");
	return n;
};

function App() {
	const [time, setTime] = useRecoilState<number>(timeState);
	const [round, setRound] = useRecoilState<number>(roundState);
	const [goal, setGoal] = useRecoilState<number>(goalState);

	const [pomodoro, setPomodoro] = useRecoilState(pomodoroState);
	console.log(pomodoro);

	const timerRef = useRef<any>();
	const [isRunning, setIsRunning] = useState(false);
	const min = Math.floor(time / 60);
	const sec = Math.floor(time % 60);

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
	}, [time, round, goal, isRunning]);

	return (
		<Container>
			<Title>Pomodoro</Title>
			<Wrapper>
				<Timer>
					<TimerBox>
						<span>{set2digits(min)}</span>
					</TimerBox>
					<li>
						<span>:</span>
					</li>
					<TimerBox>
						<span>{set2digits(sec)}</span>
					</TimerBox>
				</Timer>
				<Buttons>
					{!isRunning && <button onClick={onClickStart}>Start</button>}
					{isRunning && <button onClick={onClickStop}>Stop</button>}
				</Buttons>
				<Col>
					<ColItem>
						<p>{`${round} / ${MaxTime.ROUNDS}`}</p>
						<span>Round</span>
					</ColItem>
					<ColItem>
						<p>{`${goal} / ${MaxTime.GOALS}`}</p>
						<span>Goal</span>
					</ColItem>
				</Col>
			</Wrapper>
		</Container>
	);
}

export default App;
