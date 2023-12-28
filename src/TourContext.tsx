import {
	Dispatch,
	SetStateAction,
	createContext,
	ReactNode,
	useState,
	useMemo,
} from "react";

export type TourContextValue = {
	tourOpen: boolean;
	setTourOpen: Dispatch<SetStateAction<boolean>>;
};

export const TourContext = createContext<TourContextValue>({
	tourOpen: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setTourOpen: () => {},
});

export function TourProvider({ children }: { children: ReactNode }) {
	const [tourOpen, setTourOpen] = useState(false);

	const tourContextValue: TourContextValue = useMemo(
		() => ({ setTourOpen, tourOpen }),
		[tourOpen]
	);

	return (
		<TourContext.Provider value={tourContextValue}>
			{children}
		</TourContext.Provider>
	);
}
