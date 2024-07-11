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

function App() {
	return (
		<Container>
			<Title>Pomodoro</Title>
		</Container>
	);
}

export default App;
