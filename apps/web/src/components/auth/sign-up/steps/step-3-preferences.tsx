"use client";

import { Checkbox } from "@mingull/ui/components/checkbox";
import { Field, FieldContent, FieldGroup, FieldLabel, FieldTitle } from "@mingull/ui/components/field";
import { withForm } from "@mingull/ui/hooks/forms";
import { cn } from "@mingull/ui/lib/utils";
import { useTranslations } from "next-intl";
import { sharedSignUpForm } from "../shared-form";

export const StepThreePreferences = withForm({
	...sharedSignUpForm,
	render: function Render({ form, className }) {
		const t = useTranslations("auth.sign-up.steps.preferences");

		return (
			<FieldGroup className={cn("gap-4", className)}>
				<form.AppField name="stepThree.interestedFranchises">
					{(field) => (
						<div className="grid gap-3 sm:grid-cols-3">
							{(
								[
									["marvel", "Marvel"],
									["dc", "DC"],
									["star-wars", "Star Wars"],
									["harry-potter", "Harry Potter"],
									["lord-of-the-rings", "The Lord of the Rings"],
									["jurassic-park", "Jurassic Park"],
									["mission-impossible", "Mission: Impossible"],
									["james-bond", "James Bond"],
								] satisfies [string, string][]
							) // [id, label] pairs
								.map(([value, label]) => {
									const selected = (field.state.value ?? []).includes(value);

									return (
										<FieldLabel key={value}>
											<Field orientation="horizontal">
												<Checkbox
													checked={selected}
													onCheckedChange={(checked) => {
														const franchises = field.state.value ?? [];
														field.handleChange(checked ? [...franchises, value] : franchises.filter((franchise) => franchise !== value));
													}}
												/>
												<FieldContent>
													<FieldTitle>{label}</FieldTitle>
												</FieldContent>
											</Field>
										</FieldLabel>
									);
								})}
						</div>
					)}
				</form.AppField>
			</FieldGroup>
		);
	},
});
