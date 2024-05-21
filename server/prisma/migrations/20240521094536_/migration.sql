-- CreateTable
CREATE TABLE `divisions` (
    `division_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `soft_delete` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `divisions_name_key`(`name`),
    PRIMARY KEY (`division_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sections` (
    `section_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `division_id` INTEGER NOT NULL,
    `soft_delete` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `sections_name_key`(`name`),
    PRIMARY KEY (`section_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `firstname` VARCHAR(20) NOT NULL,
    `lastname` VARCHAR(20) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `role` ENUM('root', 'helpdesk', 'technical_support', 'user') NOT NULL,
    `section_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `verify` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `device_prefixs` (
    `prefix_id` INTEGER NOT NULL AUTO_INCREMENT,
    `prefix` VARCHAR(20) NOT NULL,
    `soft_delete` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`prefix_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `forms` (
    `form_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(20) NOT NULL,
    `soft_delete` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`form_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tickets` (
    `ticket_id` INTEGER NOT NULL AUTO_INCREMENT,
    `device_no` VARCHAR(10) NOT NULL,
    `received_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `problem` LONGTEXT NOT NULL,
    `device_prefix` INTEGER NOT NULL,
    `form_id` INTEGER NOT NULL,
    `requested_by` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`ticket_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assigned_tickets` (
    `assigned_id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('pending', 'in_process', 'completed', 'condemned') NOT NULL,
    `ticket_id` INTEGER NOT NULL,
    `assigned_in` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`assigned_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tech_support_actions` (
    `tech_id` INTEGER NOT NULL AUTO_INCREMENT,
    `action` LONGTEXT NULL,
    `recommendation` LONGTEXT NULL,
    `categories` LONGTEXT NULL,
    `started_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `finished_date` DATETIME(3) NOT NULL,
    `assigned_to` INTEGER NOT NULL,

    PRIMARY KEY (`tech_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sections` ADD CONSTRAINT `sections_division_id_fkey` FOREIGN KEY (`division_id`) REFERENCES `divisions`(`division_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_section_id_fkey` FOREIGN KEY (`section_id`) REFERENCES `sections`(`section_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_device_prefix_fkey` FOREIGN KEY (`device_prefix`) REFERENCES `device_prefixs`(`prefix_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_requested_by_fkey` FOREIGN KEY (`requested_by`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_form_id_fkey` FOREIGN KEY (`form_id`) REFERENCES `forms`(`form_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assigned_tickets` ADD CONSTRAINT `assigned_tickets_ticket_id_fkey` FOREIGN KEY (`ticket_id`) REFERENCES `tickets`(`ticket_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assigned_tickets` ADD CONSTRAINT `assigned_tickets_assigned_in_fkey` FOREIGN KEY (`assigned_in`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tech_support_actions` ADD CONSTRAINT `tech_support_actions_assigned_to_fkey` FOREIGN KEY (`assigned_to`) REFERENCES `assigned_tickets`(`assigned_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
