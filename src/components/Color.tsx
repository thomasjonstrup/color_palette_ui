import React, { useCallback } from 'react';
import styled from "styled-components";

const ColorPaletteItem = styled.div`
	background: white;
	box-shadow: 0.4px 0.4px 35px rgba(0, 0, 0, 0.116);
	padding: 0.5rem;
	border-radius: 0.5rem;
	height: 329px;
`;

const ColorImg = styled.div`
	background-color: ${(props) => props.color || "palevioletred"};
	height: 250px;
	border-radius: 0.2rem;
`;

const ColorText = styled.div`
	margin-top: 0.9rem;
`;

interface ColorProps {
	paletteColor: string;
	onChange: Function;
}

export const Color: React.FC<ColorProps> = ({ paletteColor, onChange }) => {
			const handleClick = useCallback(() => {
				onChange(paletteColor);
			}, [paletteColor, onChange]);

			return (
				<ColorPaletteItem onClick={handleClick} key={paletteColor}>
					<ColorImg color={paletteColor} />
					<ColorText>{paletteColor.toUpperCase()}</ColorText>
				</ColorPaletteItem>
			);
		};