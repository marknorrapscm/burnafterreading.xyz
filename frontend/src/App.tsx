import React from "react";
import "./App.css";
import "./style/_global.css";
import { LayoutWrapper } from "./Components/LayoutWrapper";
import { Home } from "./pages/Home";
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import { ViewNote } from "./pages/ViewNote";
import { Contact } from "./pages/Contact";
import { Privacy } from "./pages/Privacy";
  
function App() {
	return (
		<Router>
			<LayoutWrapper>
				<Switch>
					<Route path="/contact" exact component={Contact} />
					<Route path="/privacy" exact component={Privacy} />
					<Route path="/" exact component={Home} />
					<Route path="/:noteHash">
						<ViewNote />
					</Route>
				</Switch>
			</LayoutWrapper>
		</Router>
	);
}

export default App;
