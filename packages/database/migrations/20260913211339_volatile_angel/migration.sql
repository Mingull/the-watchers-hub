CREATE TABLE `franchises` (
	`id` varchar(36) PRIMARY KEY,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `name_unique` UNIQUE INDEX(`name`)
);
--> statement-breakpoint
CREATE TABLE `genres` (
	`id` varchar(36) PRIMARY KEY,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `name_unique` UNIQUE INDEX(`name`)
);
--> statement-breakpoint
CREATE TABLE `user_franchises` (
	`user_id` varchar(36) NOT NULL,
	`franchise_id` varchar(36) NOT NULL,
	CONSTRAINT PRIMARY KEY(`user_id`,`franchise_id`)
);
--> statement-breakpoint
CREATE TABLE `user_genres` (
	`user_id` varchar(36) NOT NULL,
	`genre_id` varchar(36) NOT NULL,
	CONSTRAINT PRIMARY KEY(`user_id`,`genre_id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `username` varchar(255) AFTER `email`;--> statement-breakpoint
ALTER TABLE `users` ADD `display_username` text AFTER `username`;--> statement-breakpoint
ALTER TABLE `users` ADD `first_name` varchar(255) AFTER `name`;--> statement-breakpoint
ALTER TABLE `users` ADD `last_name` varchar(255) AFTER `first_name`;--> statement-breakpoint
CREATE UNIQUE INDEX `username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `accounts_issuer_accountId_uidx` ON `accounts` (`issuer`,`account_id`);--> statement-breakpoint
ALTER TABLE `user_franchises` ADD CONSTRAINT `user_franchises_user_id_users_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `user_franchises` ADD CONSTRAINT `user_franchises_franchise_id_franchises_id_fkey` FOREIGN KEY (`franchise_id`) REFERENCES `franchises`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `user_genres` ADD CONSTRAINT `user_genres_user_id_users_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `user_genres` ADD CONSTRAINT `user_genres_genre_id_genres_id_fkey` FOREIGN KEY (`genre_id`) REFERENCES `genres`(`id`) ON DELETE CASCADE;