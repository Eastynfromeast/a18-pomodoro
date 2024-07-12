import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme/theme";
import { Helmet, HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<RecoilRoot>
			<HelmetProvider>
				<Helmet>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Press+Start+2P&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap"
						rel="stylesheet"
					/>
				</Helmet>
				<ThemeProvider theme={darkTheme}>
					<GlobalStyle />
					<App />
				</ThemeProvider>
			</HelmetProvider>
		</RecoilRoot>
	</React.StrictMode>
);
