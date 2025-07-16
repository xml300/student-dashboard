CREATE TABLE "attendance_records" (
	"record_id" serial PRIMARY KEY NOT NULL,
	"session_id" integer,
	"student_id" integer,
	"attendance_record" integer NOT NULL,
	"marked_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_session_id_lecture_sessions_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."lecture_sessions"("session_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_student_id_students_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("student_id") ON DELETE no action ON UPDATE no action;