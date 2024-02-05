import "./App.css";
import { createPortal } from "react-dom";
import { Tour } from "./Tour";
import { TourProvider, TourContext } from "./TourContext";

function App() {
	return (
		<TourProvider>
			<TourContext.Consumer>
				{({ setTourOpen }) => (
					<div className="wrapper">
						<div id="div1" />
						<div id="div2" />
						<div id="div3" />
						<div id="div4" />
						<div id="div5" onClick={() => setTourOpen(true)}>
							<div id="subdiv1"></div>
							<div
								id="subdiv2"
								style={{
									width: "80px",
									height: "80px",
									borderRadius: "50%",
									backgroundColor: "white",
									border: "1px solid black",
								}}
							></div>
						</div>
						<div id="div6" />
						<div id="div7" />
						<div id="div8" />
						<div id="div9" />
						{createPortal(
							<Tour
								steps={[
									{
										levels: [
											[{ id: "#subdiv1" }],
											[
												{
													id: "#subdiv1",
													padding: 40,
													shouldNotChangeZIndex: true,
												},
											],
										],
										modalProps: {
											horizontal: 'center',
											vertical: 'center',
											relativeTo: 'screen',
										}
									},
								]}
							/>,
							document.body
						)}
					</div>
				)}
			</TourContext.Consumer>
		</TourProvider>
	);
}

export default App;
