"use client";

import { useState } from "react";
import type { Step } from "./types";

export function useStepperize<const T extends Step[]>(steps: T) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const canNext = currentIndex < steps.length - 1;
	const next = () => {
		const newIndex = Math.min(currentIndex + 1, steps.length - 1);
		setCurrentIndex(newIndex);
	};

	const canPrev = currentIndex > 0;
	const prev = () => {
		const newIndex = Math.max(currentIndex - 1, 0);
		setCurrentIndex(newIndex);
	};

	const goTo = (stepId: T[number]["id"]) => {
		const index = steps.findIndex((step) => step.id === stepId);
		if (index >= 0 && index < steps.length) {
			setCurrentIndex(index);
		}
	};

	return {
		index: currentIndex,
		count: steps.length,
		data: steps,
		current: steps[currentIndex],
		canNext,
		next,
		canPrev,
		prev,
		goTo,
	};
}
