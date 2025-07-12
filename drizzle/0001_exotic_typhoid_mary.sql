CREATE TABLE "courses" (
	"course_id" serial PRIMARY KEY NOT NULL,
	"course_name" text NOT NULL,
	"course_code" text NOT NULL,
	"course_desc" text NOT NULL,
	"course_unit" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "courses_course_code_unique" UNIQUE("course_code")
);
--> statement-breakpoint
CREATE TABLE "lecture_sessions" (
	"session_id" serial PRIMARY KEY NOT NULL,
	"course_id" integer,
	"session_datetime" timestamp DEFAULT now(),
	"duration" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "students" (
	"student_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"matric_no" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "lecturers" ADD COLUMN "lecturer_id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "lecturers" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "lecturers" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "lecturers" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "lecture_sessions" ADD CONSTRAINT "lecture_sessions_course_id_courses_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("course_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lecturers" ADD CONSTRAINT "lecturers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;