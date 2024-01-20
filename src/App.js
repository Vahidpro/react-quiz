import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";

const initialState = {
	questions: [],
	// 'loading', 'error','ready','active','finished',
	status: "loading",
};

function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return { ...state, questions: action.payload, status: "ready" };
		case "dataFailed":
			return { ...state, status: "error" };
		default:
			throw new Error("Action Unknown");
	}
}

export default function App() {
	const [{ question, status }, dispatch] = useReducer(reducer, initialState);
	useEffect(() => {
		fetch("http://localhost:8000/questions")
			.then((res) => res.json())
			.then((data) => dispatch({ type: "dataReceived", payload: data }))
			.catch(dispatch({ type: "dataFailed" }));
	}, []);

	return (
		<div className="app">
			<Header />
			<Main>{status === "loading" && <Loader />}</Main>
			<Main>{status === "error" && <Error />}</Main>
		</div>
	);
}
