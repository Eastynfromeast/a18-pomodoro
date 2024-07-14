import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export enum MaxTime {
	"ROUNDS" = 4,
	"GOALS" = 12,
	"TIME" = 60 * 25,
}

export interface IPomodoro {
	rounds: number;
	goals: number;
}

export const timeState = atom({
	key: "time",
	default: MaxTime.TIME,
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
		rounds: 0,
		goals: 0,
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
