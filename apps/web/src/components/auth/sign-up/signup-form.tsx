"use client";

import { useStepperize } from "@/hooks/stepper/use-stepperize";
import { Link } from "@/i18n/navigation";
import { authClient } from "@/lib/auth/client";
import { signUp } from "@/server/auth/sign-up";
import { DiscordIcon, GoogleIcon } from "@mingull/icons";
import { Button } from "@mingull/ui/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@mingull/ui/components/card";
import { FieldSet } from "@mingull/ui/components/field";
import { useAppForm } from "@mingull/ui/hooks/forms";
import { cn } from "@mingull/ui/lib/utils";
import { revalidateLogic } from "@tanstack/react-form";
import { Eye } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Balancer } from "react-wrap-balancer";
import { toast } from "sonner";
import { signUpFormSchema, stepOneSchema, stepThreeSchema, stepTwoSchema } from "./schemas";
import { sharedSignUpForm } from "./shared-form";
import { StepOneCredentials } from "./steps/step-1-credentials";
import { StepTwoPersonalInfo } from "./steps/step-2-personal-info";
import { StepThreePreferences } from "./steps/step-3-preferences";

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
	const t = useTranslations("auth.sign-up");
	const [errorMessage, setErrorMessage] = useState<string | null>(null); // global error message state

	const form = useAppForm({
		...sharedSignUpForm,
		validationLogic: revalidateLogic(),
		validators: {
			onDynamic: signUpFormSchema,
		},
		onSubmit: async ({ value }) => {
			setErrorMessage(null);

			const { error } = await signUp({
				email: value.stepOne.email,
				password: value.stepOne.password,
				firstName: value.stepTwo.firstName,
				lastName: value.stepTwo.lastName,
				username: value.stepTwo.username,
				franchises: value.stepThree.interestedFranchises,
				genres: value.stepThree.interestedGenres,
			});

			if (error) {
				setErrorMessage(error.message || "Failed to sign up.");
				toast.error(error.message || "Failed to sign up.", { position: "top-center" });
				return;
			}

			form.reset();
			toast.success("Signed up successfully!", { position: "top-center" });
		},
	});

	const stepper = useStepperize([
		{ id: "credentials", title: t("steps.credentials.title"), subtitle: t("steps.credentials.subtitle") },
		{ id: "personal-info", title: t("steps.personal-info.title"), subtitle: t("steps.personal-info.subtitle") },
		{ id: "preferences", title: t("steps.preferences.title"), subtitle: t("steps.preferences.subtitle") },
	]);

	const handleSignInProvider = async (provider: "google" | "discord") => {
		await authClient.signIn.social({ provider, callbackURL: "/dashboard" });
	};

	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="grid grid-cols-subgrid gap-3">
			{/* Vertical stepper indicator */}
			<Card className="col-span-2">
				<CardContent className="flex gap-4">
					{stepper.data.map((step, index) => (
						<div key={index} className="flex w-full flex-col items-center gap-2" onClick={() => stepper.goTo(step.id)}>
							<span className={cn("bg-muted flex h-8 w-8 items-center justify-center rounded-full border", stepper.index === index && "border-primary border-2")}>
								{index + 1}
							</span>
							<span className="font-medium">{step.title}</span>
							<span className="text-muted-foreground text-center text-xs">{step.subtitle}</span>
						</div>
					))}
				</CardContent>
			</Card>
			{/* Title and description card */}
			<Card className={cn("flex flex-col gap-6 backdrop-blur-md", className)} {...props}>
				<CardHeader>
					<div className="flex flex-col items-center gap-2">
						<a href="#" className="flex flex-col items-center gap-2 font-medium">
							<div className="flex size-8 items-center justify-center rounded-md">
								<Eye size={64} />
							</div>
							<span className="sr-only">Fitness Trainer Platform</span>
						</a>
						<CardTitle>{t("title", { title: "The Watchers Hub" })}</CardTitle>
						<CardDescription>
							<Balancer>{t("subtitle", { title: "The Watchers Hub" })}</Balancer>
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent></CardContent>
			</Card>
			{/* Main sign-up form */}
			<Card>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							form.handleSubmit();
						}}
					>
						<div className="flex flex-col gap-4">
							{errorMessage ?
								<div className="text-center text-red-500">{errorMessage}</div>
							:	null}
							<FieldSet className="flex flex-col gap-4">
								{stepper.index === 0 && (
									<form.FormGroup name="stepOne" validators={{ onDynamic: stepOneSchema }} onGroupSubmit={() => stepper.next()}>
										{(formGroup) => (
											<div className="flex flex-col gap-3">
												<StepOneCredentials form={form} className={cn()} />
												<Button onClick={formGroup.handleSubmit} disabled={form.state.isSubmitting}>
													{t("actions.next")}
												</Button>
											</div>
										)}
									</form.FormGroup>
								)}

								{stepper.index === 1 && (
									<form.FormGroup name="stepTwo" validators={{ onDynamic: stepTwoSchema }} onGroupSubmit={() => stepper.next()}>
										{(formGroup) => (
											<div className="flex flex-col gap-3">
												<StepTwoPersonalInfo form={form} className={cn()} />
												<div className="flex flex-row gap-3">
													<Button variant="outline" className="flex-1" onClick={() => stepper.prev()}>
														{t("actions.back")}
													</Button>
													<Button className="flex-1" onClick={formGroup.handleSubmit} disabled={form.state.isSubmitting}>
														{t("actions.next")}
													</Button>
												</div>
											</div>
										)}
									</form.FormGroup>
								)}
								{stepper.index === 2 && (
									<form.FormGroup name="stepThree" validators={{ onDynamic: stepThreeSchema }} onGroupSubmit={() => stepper.next()}>
										{(formGroup) => (
											<div className="flex flex-col gap-3">
												<StepThreePreferences form={form} className={cn()} />
												<div className="flex flex-row gap-3">
													<Button variant="outline" className="flex-1" onClick={() => stepper.prev()}>
														{t("actions.back")}
													</Button>
													<Button className="flex-1" onClick={formGroup.handleSubmit} disabled={form.state.isSubmitting}>
														{t("actions.next")}
													</Button>
												</div>
											</div>
										)}
									</form.FormGroup>
								)}

								<div className="text-center text-sm">
									{t("have-account")}{" "}
									<Link href="/sign-in" className="underline underline-offset-4">
										{t("linkText")}
									</Link>
								</div>
							</FieldSet>
							<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
								<span className="bg-card text-muted-foreground relative z-10 px-2">{t("divider")}</span>
							</div>
							<div className="grid gap-4 sm:grid-cols-2">
								<Button
									variant="outline"
									type="button"
									className="w-full"
									onClick={() => handleSignInProvider("google")}
									aria-label={t("continue", { provider: "Google" })}
								>
									<GoogleIcon className="text-foreground" />
									{t("continue", { provider: "Google" })}
								</Button>
								<Button
									variant="outline"
									type="button"
									className="w-full"
									onClick={() => handleSignInProvider("discord")}
									aria-label={t("continue", { provider: "Discord" })}
								>
									<DiscordIcon className="text-foreground" />
									{t("continue", { provider: "Discord" })}
								</Button>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
						<Balancer>
							{t.rich("tos", {
								tos: (chunks) => (
									// @ts-expect-error
									<Link href="/terms-of-service" className="underline">
										{chunks}
									</Link>
								),
								privacy: (chunks) => (
									// @ts-expect-error
									<Link href="/privacy-policy" className="underline">
										{chunks}
									</Link>
								),
							})}
						</Balancer>
					</div>
				</CardFooter>
			</Card>
		</motion.div>
	);
}
