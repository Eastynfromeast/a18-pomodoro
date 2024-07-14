import { motion } from "framer-motion";
import styled from "styled-components";
import { set2digits } from "../utils/utils";

interface ITime {
	time: number;
}

const TimerContainer = styled(motion.ul)`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;

const TimerBox = styled(motion.li)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 150px;
	height: 200px;
	border-radius: 15px;
	color: ${props => props.theme.textColor};
	border: 1px solid;
	font-weight: 600;
	border-radius: 15px;
	font-size: 2em;
`;

const TimerColon = styled(TimerBox)`
	font-size: 2em;
	font-weight: 600;
	border: none;
	width: unset;
	opacity: 0.75;
`;

const timerBoxVariants = {
	initial: {
		scale: 0.15,
		opacity: 0.15,
		boxShadow: "0 0 1px rgba(58, 227, 116, 1)",
	},
	animate: {
		scale: 1,
		opacity: 1,
		boxShadow: "0 0 15px rgba(58, 227, 116, 1)",
		transition: {
			type: "spring",
			duration: 1,
		},
	},
};

function Timer({ time }: ITime) {
	const min = Math.floor(time / 60);
	const sec = Math.floor(time % 60);
	return (
		<>
			<TimerContainer>
				<TimerBox variants={timerBoxVariants} initial="initial" animate="animate" key={min}>
					{set2digits(min)}
				</TimerBox>
				<TimerColon>:</TimerColon>
				<TimerBox variants={timerBoxVariants} initial="initial" animate="animate" key={sec}>
					{set2digits(sec)}
				</TimerBox>
			</TimerContainer>
		</>
	);
}

export default Timer;
