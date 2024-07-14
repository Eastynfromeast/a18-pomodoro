import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import { isRunningState } from "../utils/atom";

interface IButtonProps {
	onClick: () => void;
}

const Button = styled(motion.button)`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 45px auto;
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
const buttonVariants = {
	initial: {
		scale: 0.5,
	},
	animate: {
		scale: 1,
		transition: {
			type: "spring",
			duration: 0.5,
		},
	},
	active: {
		scale: 1.2,
		transition: {
			duration: 0.2,
		},
	},
};

function TimerButton({ onClick }: IButtonProps) {
	const isRunning = useRecoilValue(isRunningState);

	return (
		<Button variants={buttonVariants} onClick={onClick} initial="initial" animate="animate" whileTap="active" whileHover="active">
			{isRunning ? (
				<svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<path
						clipRule="evenodd"
						fillRule="evenodd"
						d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
					/>
				</svg>
			) : (
				<svg fill="currentColor" viewBox="0 0 22 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
					/>
				</svg>
			)}
		</Button>
	);
}

export default TimerButton;
