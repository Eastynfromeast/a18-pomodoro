import { DefaultTheme } from "styled-components";

declare module "styled-compoents" {
	export interface DefaultTheme {
		bgColor: string;
		textColor: string;
	}
}
