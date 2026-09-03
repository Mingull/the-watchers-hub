import { formOptions } from "@tanstack/react-form";
import { z } from "zod";
import { stepOneSchema, stepThreeSchema, stepTwoSchema } from "./schemas";

export const sharedSignUpForm = formOptions({
	defaultValues: {
		stepOne: {
			email: "",
			password: "",
			confirmPassword: "",
		} satisfies z.infer<typeof stepOneSchema> as z.infer<typeof stepOneSchema>,
		stepTwo: {
			username: "",
			firstname: "",
			lastname: "",
		} satisfies z.infer<typeof stepTwoSchema> as z.infer<typeof stepTwoSchema>,
		stepThree: {
			interestedFranchises: [],
			interestedGenres: [],
		} satisfies z.infer<typeof stepThreeSchema> as z.infer<typeof stepThreeSchema>,
	},
	props: {
		className: "",
	},
});
