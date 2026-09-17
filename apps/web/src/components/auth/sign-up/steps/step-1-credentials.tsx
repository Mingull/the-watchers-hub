"use client";

import { AdvancedInput } from "@mingull/ui/components/advanced-input";
import { FieldGroup } from "@mingull/ui/components/field";
import { FormBase } from "@mingull/ui/components/forms/base";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@mingull/ui/components/input-group";
import { withForm } from "@mingull/ui/hooks/forms";
import { cn } from "@mingull/ui/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { passwordRequirements } from "../schemas";
import { sharedSignUpForm } from "../shared-form";

export const StepOneCredentials = withForm({
	...sharedSignUpForm,
	render: function Render({ form, className }) {
		const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
		const t = useTranslations("auth.sign-up.steps.credentials");
		return (
			<FieldGroup className={cn("gap-4", className)}>
				<form.AppField name="stepOne.email">{(field) => <field.Input label={t("fields.email.label")} placeholder={t("fields.email.placeholder")} />}</form.AppField>

				<form.AppField name="stepOne.password">
					{(field) => (
						<FormBase label={t("fields.password.label")}>
							{(isInvalid) => (
								<AdvancedInput
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
									type="password"
									placeholder={t("fields.password.placeholder")}
									requirements={passwordRequirements}
									onStrengthChange={(strength) => {
										if (strength === 0) return { color: "bg-border", text: "Enter a password" };
										if (strength <= 1) return { color: "bg-red-500", text: "Very weak password" };
										if (strength <= 2) return { color: "bg-orange-500", text: "Weak password" };
										if (strength <= 3) return { color: "bg-amber-500", text: "Medium password" };
										if (strength <= 4) return { color: "bg-yellow-500", text: "Good password" };
										if (strength === 5) return { color: "bg-green-500", text: "Strong password" };
										return { color: "bg-emerald-500", text: "Strong password" };
									}}
								/>
							)}
						</FormBase>
					)}
				</form.AppField>

				<form.AppField name="stepOne.confirmPassword">
					{(field) => (
						<FormBase label={t("fields.confirmPassword.label")}>
							{(isInvalid) => (
								<InputGroup>
									<InputGroupInput
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										aria-invalid={isInvalid}
										type={showPasswordConfirm ? "text" : "password"}
										placeholder={t("fields.confirmPassword.placeholder")}
									/>
									<InputGroupAddon align="inline-end">
										<InputGroupButton
											onClick={() => {
												setShowPasswordConfirm((prev) => !prev);
											}}
											aria-label="Toggle password visibility"
										>
											{showPasswordConfirm ?
												<EyeOff />
											:	<Eye />}
										</InputGroupButton>
									</InputGroupAddon>
								</InputGroup>
							)}
						</FormBase>
					)}
				</form.AppField>
			</FieldGroup>
		);
	},
});
