import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export enum MaxTime {
	"ROUNDS" = 2,
	"GOALS" = 2,
	"TIME" = 60 * 0.1,
}

export interface IPomodoro {
	time: number;
	rounds: number;
	goals: number;
	isRunning: boolean;
}

export const timeState = atom({
	key: "time",
	default: MaxTime.TIME,
});

export const roundState = atom({
	key: "round",
	default: 0,
});

export const goalState = atom({
	key: "goal",
	default: 0,
});

export const isRunningState = atom({
	key: "running",
	default: false,
});

const { persistAtom } = recoilPersist({
	key: "pomodoroLocal",
	storage: localStorage,
});

export const pomodoroState = atom<IPomodoro>({
	key: "pomodoro",
	default: {
		time: MaxTime.TIME,
		rounds: 0,
		goals: 0,
		isRunning: false,
	},
	effects_UNSTABLE: [persistAtom],
});

export const pomodoroSelector = selector({
	key: "pomodoroSelector",
	get: ({ get }) => {
		const pomodoro = get(pomodoroState);
		return pomodoro;
	},
});
