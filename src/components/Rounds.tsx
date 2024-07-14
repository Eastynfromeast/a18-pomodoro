import { useRecoilValue } from "recoil";
import { MaxTime, pomodoroState } from "../utils/atom";
import styled from "styled-components";
import { motion } from "framer-motion";

const RoundsWrapper = styled(motion.ul)`
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

const roundGoalVariants = {
	initial: {
		scale: 1,
		textShadow: "0 0 0px rgba(58, 227, 116, 0)",
	},
	animate: {
		scale: 1.2,
		textShadow: "0 0 10px rgba(58, 227, 116, 1)",
		transition: {
			type: "spring",
			duration: 0.25,
		},
	},
};

function Rounds() {
	const pomodoro = useRecoilValue(pomodoroState);
	const pomodoroKeys = Object.keys(pomodoro);

	return (
		<>
			<RoundsWrapper>
				{pomodoroKeys.map(item => (
					<Round key={item}>
						<RoundGoal variants={roundGoalVariants} initial="initial" animate="animate" key={item}>
							{item === "rounds" ? `${pomodoro.rounds} / ${MaxTime.ROUNDS}` : `${pomodoro.goals} / ${MaxTime.GOALS}`}
						</RoundGoal>
						<span>{item === "rounds" ? "Round" : "Goal"}</span>
					</Round>
				))}
			</RoundsWrapper>
		</>
	);
}

export default Rounds;
