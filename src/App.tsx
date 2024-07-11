import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

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

const set2digits = (n: number | string) => {
	if ((n as number) < 10) n = n.toString().padStart(2, "0");
	return n;
};

function App() {
	const [timer, setTimer] = useState(1000 * 60 * 25);
	const min = set2digits(Math.floor(timer / (60 * 1000)));
	const sec = set2digits(Math.floor((timer / Number(min)) % 60));
	return (
		<Container>
			<Title>Pomodoro</Title>
			<div>
				<Timer>
					<TimerBox>
						<span>{min}</span>
					</TimerBox>
					<li>
						<span>:</span>
					</li>
					<TimerBox>
						<span>{sec}</span>
					</TimerBox>
				</Timer>
			</div>
		</Container>
	);
}

export default App;
