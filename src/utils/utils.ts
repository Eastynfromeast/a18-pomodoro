export const set2digits = (n: number | string) => {
	if ((n as number) < 10) n = n.toString().padStart(2, "0");
	return n;
};
