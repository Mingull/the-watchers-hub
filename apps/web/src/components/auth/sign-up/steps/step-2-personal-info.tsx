"use client";

import { FieldGroup } from "@mingull/ui/components/field";
import { withForm } from "@mingull/ui/hooks/forms";
import { cn } from "@mingull/ui/lib/utils";
import { useTranslations } from "next-intl";
import { sharedSignUpForm } from "../shared-form";

export const StepTwoPersonalInfo = withForm({
	...sharedSignUpForm,
	render: function Render({ form, className }) {
		const t = useTranslations("auth.sign-up.steps.personal-info");
		return (
			<FieldGroup className={cn("gap-4", className)}>
				<form.AppField name="stepTwo.firstName">
					{(field) => <field.Input label={t("fields.first-name.label")} placeholder={t("fields.first-name.placeholder")} />}
				</form.AppField>

				<form.AppField name="stepTwo.lastName">
					{(field) => <field.Input label={t("fields.last-name.label")} placeholder={t("fields.last-name.placeholder")} />}
				</form.AppField>

				<form.AppField name="stepTwo.username">
					{(field) => <field.Input label={t("fields.username.label")} placeholder={t("fields.username.placeholder")} />}
				</form.AppField>
			</FieldGroup>
		);
	},
});
