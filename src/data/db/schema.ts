import {
  timestamp,
  pgTable,
  text,
  integer,
  serial,
  varchar
} from "drizzle-orm/pg-core"

const timestamps = {
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().$onUpdate(() => new Date())
};

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  userType: integer("userType").notNull().default(0),
  ...timestamps
})

export const lecturers = pgTable('lecturers', {
  id: serial("lecturer_id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  ...timestamps
});

export const students = pgTable('students', {
  id: serial('student_id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  matricNo: varchar("matric_no", { length: 50 }).notNull(),
  ...timestamps
});

export const courses = pgTable('courses', {
  id: serial("course_id").primaryKey(),
  courseName: text('course_name').notNull(),
  courseCode: text('course_code').notNull().unique(),
  courseDesc: text('course_desc').notNull(),
  courseUnit: integer('course_unit').notNull(),
  semester: integer('semester').notNull(),
  status: varchar('status').notNull(),
  ...timestamps
});

export const lectureSessions = pgTable('lecture_sessions', {
  id: serial("session_id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id),
  sessionDatetime: timestamp('session_datetime').defaultNow(),
  duration: integer('duration').notNull(),
  status: text('status'),
  ...timestamps 
});

export const attendanceRecords = pgTable('attendance_records', {
  id: serial('record_id').primaryKey(),
  sessionId: integer('session_id').references(() => lectureSessions.id),
  studentId: integer('student_id').references(() => students.id),
  attendanceRecord: integer('attendance_record').notNull(),
  markedAt: timestamp('marked_at').defaultNow(),
  ...timestamps
});

export const courseAssignments = pgTable('course_assignments', {
  id: serial('id').primaryKey(),
  lecturerId: integer('lecturer_id').references(() => lecturers.id),
  courseId: integer('course_id').references(() => courses.id),
  ...timestamps
});

export const studentEnrollments = pgTable('student_enrollments', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id').references(() => students.id),
  courseId: integer('course_id').references(() => courses.id),
  enrollmentDate: timestamp('enrollment_date').defaultNow(),
  enrollmentStatus: varchar('enrollment_status', {length: 30, enum: ["Ongoing", "Completed"]}),
  ...timestamps
});

export const authorizedDevices = pgTable('authorized_devices', {
  id: serial('device_id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  deviceUUID: varchar('device_uuid', {length: 100}).notNull(),
  deviceType: varchar('device_type', {length: 50, enum:["Laptop", "Phone"]}),
  status: varchar('status', {length: 30}).notNull(),
  authorizedAt: timestamp('authorized_at').defaultNow(),
  ...timestamps
});

export const activities = pgTable('activities', {
  id: serial('id').primaryKey(),
  category: varchar('category', { length: 50 }).notNull(),
  action: text('action').notNull(),
  affectedItem: varchar('affected_item', { length: 100 }),
  details: text('details').notNull(),
  timestamp: timestamp('timestamp').defaultNow(),
  ...timestamps
});

export const attendanceRooms = pgTable('attendance_rooms', {
  id: serial('id').primaryKey(),
  sessionId: integer('session_id').references(() => lectureSessions.id),
  deviceUUID: varchar('device_uuid', {length: 100}).notNull(),
  ...timestamps
});


export type User = typeof users.$inferSelect;
export type Lecturer = typeof lecturers.$inferSelect;
export type Student = typeof students.$inferSelect;
export type Course = typeof courses.$inferSelect;
