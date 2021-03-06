import React, { useState, useCallback, useEffect} from "react";
import copy from 'copy-to-clipboard';
import "./App.css";

import { Color } from "./components/Color";

import styled from "styled-components";

import Data from "./data/colors.json";

declare global {
	interface Window {
		clipboardData: any;
	}
}

window.clipboardData = window.clipboardData || {};

const ColorImg = styled.div`
	background-color: ${(props) => props.color || "palevioletred"};
	height: 250px;
	border-radius: 0.2rem;
	cursor: pointer;
`;

const ColorText = styled.div`
	margin-top: 0.9rem;
`;

function App() {
	const [randomPalette, setRandomPalette] = useState(
		Data[Math.floor(Math.random() * Data.length)]
	);

	const [copyColor, setCopyColor] = useState('');

	const handleColorChange = useCallback(() => {
		const random = Data[Math.floor(Math.random() * Data.length)];
		setRandomPalette(random);
	}, []);

	const handleColorCopy = useCallback((color) => {
		setCopyColor(color);
		copy(color);

		setTimeout(() => {
			setCopyColor('')
		}, 2000)
	}, []);


	// Bind and unbind events
	// Add event listeners
	useEffect(() => {
		const handleSpacePress = (event: any) => {
			event.preventDefault();
			if (event.keyCode === 32) {
				handleColorChange();
			}
		};

		window.addEventListener("keydown", handleSpacePress, false);
		// Remove event listeners on cleanup
		return () => {
			window.removeEventListener("keydown", handleSpacePress, false);
		};
	}, [handleColorChange]); // Empty array ensures that effect is only run on mount and unmount
	if (!Data) {
		return null;
	}

	return (
		<section className="section1">
			{copyColor.length > 0 && (
				<div className="alert-div">
					<p>
						Color {copyColor.toUpperCase()} copied to your clipboard
					</p>
				</div>
			)}
			<h1>Color Palette Generator</h1>
			<div className="colors">
				{randomPalette.map((paletteColor) => {
					return (
						<Color
							onChange={handleColorCopy}
							paletteColor={paletteColor}
							key={paletteColor}
						>
							<ColorImg color={paletteColor} />
							<ColorText>{paletteColor.toUpperCase()}</ColorText>
						</Color>
					);
				})}
			</div>
			<div className="button_wrapper">
				<button className="btn" onClick={handleColorChange}>
					Generate palettte
				</button>
				<p>Or just press the "Spacebar" to generate new palettes.</p>
			</div>
			<div className="help">
				<p>
					Click to copy individual color • Press “C” to copy palette
				</p>
			</div>
		</section>
	);
}

export default App;
