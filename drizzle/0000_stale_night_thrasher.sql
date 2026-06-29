CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(256) NOT NULL,
	"last_name" varchar(256),
	"email" varchar(355) NOT NULL,
	"email_verified" boolean DEFAULT false,
	"password" varchar(66),
	"salt" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
