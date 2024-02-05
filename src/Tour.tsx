import { useState, useRef, useEffect, Fragment, useContext, useMemo } from "react";
import { TourContext } from "./TourContext";
import { ModalProps, SVGProps, StepProps, TourProps, defaultModalProps, getFocusedElement, startingZIndex } from "./Tour.utils";
import { generatePosition } from "./assets/ModalAlignment/generatePosition";




export function Tour({ steps }: TourProps) {
	const { setTourOpen, tourOpen } = useContext(TourContext);
	const [currentStep, setCurrentStep] = useState<StepProps>(steps[0])
	const [tourLevels, setTourLevels] = useState<SVGProps[][]>([]);
	const positionRefs = useRef<Array<{ oldPosition: string; ref: HTMLElement }>>(
		[]
	);

	const infoModalProps: ModalProps = useMemo(() => {
		return {
			horizontal: currentStep.modalProps?.horizontal ?? defaultModalProps.horizontal,
			vertical: currentStep.modalProps?.vertical ?? defaultModalProps.vertical,
			relativeTo: currentStep.modalProps?.relativeTo ?? defaultModalProps.relativeTo,
			className: currentStep.modalProps?.className ?? defaultModalProps.className,
			children: currentStep.modalProps?.children ?? <></>,
		}
	}, [currentStep])

	const onClose = () => {
		setTourOpen(false);

		for (const { oldPosition, ref } of positionRefs.current) {
			ref.style.zIndex = "0";
			ref.style.position = oldPosition;
		}
	};

	useEffect(() => {
		if (tourOpen) {
			positionRefs.current = [];
			const stepsProps: SVGProps[][] = [];

			for (const { levels } of steps) {
				for (const [levelIndex, level] of levels.entries()) {
					const newLevel: SVGProps[] = [];
					for (const { id, padding, shouldNotChangeZIndex } of level) {
						const focusedElement = document.querySelector<HTMLElement>(id);

						if (focusedElement) {
							const boundRect = focusedElement.getBoundingClientRect();

							if (!shouldNotChangeZIndex) {
								const oldPosition = getComputedStyle(focusedElement).position;

								positionRefs.current.push({
									oldPosition,
									ref: focusedElement,
								});

								focusedElement.style.zIndex = `${startingZIndex - levelIndex * 3
									}`;

								focusedElement.style.position =
									oldPosition === "absolute" ? "absolute" : "relative";
							}

							const actualPadding = padding ?? 0;

							newLevel.push({
								y: boundRect.top - actualPadding,
								x: boundRect.left - actualPadding,
								width: boundRect.width + actualPadding * 2,
								height: boundRect.height + actualPadding * 2,
								rx: 9999,
							});
						}
					}
					stepsProps.push(newLevel);
				}
			}

			setTourLevels(stepsProps);
		}
	}, [tourOpen, steps]);

	return tourOpen ? (
		<>

			{tourLevels.map((highlightStyles, levelIndex) => (
				<Fragment key={levelIndex}>
					<svg
						viewBox="0 0 100vh 100vw"
						max-width="100vw"
						width="100%"
						max-height="100vh"
						height="100%"
						key={`mask${levelIndex}`}
						style={{
							position: "absolute",
							top: "0",
							left: "0",
						}}
					>
						<mask id={`mask${levelIndex}`}>
							<rect x="0" y="0" width="100%" height="100%" fill="white" />
							{highlightStyles.map((svgProps, index) => (
								<rect
									key={`mask-${levelIndex}-${index}`}
									{...svgProps}
									fill="black"
								/>
							))}
						</mask>
					</svg>
					<div
						onClick={onClose}
						style={{
							position: "absolute",
							top: "0",
							left: "0",
							height: "100vh",
							width: "100vw",
							zIndex: startingZIndex - (levelIndex + 1) - levelIndex * 2,
							backgroundColor: `rgb(0, 0, 0, ${0.7 / tourLevels.length})`,
							mask: `url(#mask${levelIndex})`,
						}}
					/>
				</Fragment>
			))}
			<div id="infoModal" className={infoModalProps.className} style={{
				zIndex: startingZIndex,
				position: 'absolute',
				...generatePosition({
					horizontal: infoModalProps.horizontal,
					vertical: infoModalProps.vertical,
					relativeTo: infoModalProps.relativeTo,
					focusedElement: getFocusedElement(currentStep)
				})
			}}>
			</div>
		</>
	) : null;
}

// 128 / 191