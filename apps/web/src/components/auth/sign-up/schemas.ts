import { defineRequirements, requirementsToSchema } from "@mingull/ui/components/advanced-input";
import { z } from "zod";

const passwordRequirements = defineRequirements(({ min, regex, noRepeats }) => [
	min(8, "Password must be at least 8 characters long"),
	regex(/[0-9]/, "Password must contain at least 1 numbers"),
	regex(/[a-z]/, "Password must contain at least 1 lowercase letters"),
	regex(/[A-Z]/, "Password must contain at least 1 uppercase letter"),
	regex(/[^a-zA-Z0-9]/, "Password must contain at least 1 special character"),
	noRepeats(3, "Password must not contain more than 3 repeating characters", ["hidden"]),
]);

export const stepOneSchema = z
	.object({
		email: z.email("Invalid email address").min(2, { error: "Email must be at least 2 characters long" }),
		password: requirementsToSchema(passwordRequirements),
		confirmPassword: z.string().min(8, { error: "Confirm password must be at least 8 characters long" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const stepTwoSchema = z.object({
	username: z.string().min(2, { error: "Username must be at least 2 characters long" }),
	firstname: z.string().min(2, { error: "First name must be at least 2 characters long" }),
	lastname: z.string().min(2, { error: "Last name must be at least 2 characters long" }),
});

export const stepThreeSchema = z.object({
	interestedFranchises: z.array(z.enum({ marvel: "Marvel", dc: "DC", starWars: "Star Wars", harryPotter: "Harry Potter" })).optional(),
	interestedGenres: z.array(z.enum({ action: "Action", comedy: "Comedy", drama: "Drama", horror: "Horror" })).optional(),
});

export const signUpFormSchema = z.object({
	stepOne: stepOneSchema,
	stepTwo: stepTwoSchema,
	stepThree: stepThreeSchema,
});
