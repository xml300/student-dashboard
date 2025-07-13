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
  id: serial("id").notNull().primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  userType: integer("userType").notNull().default(0),
  ...timestamps
})

export const lecturers = pgTable('lecturers', {
  lecturerId: serial("lecturer_id").primaryKey(),
  userId: text("user_id").references(() => users.id).notNull(),
  ...timestamps
});

export const students = pgTable('students', {
  studentId: serial('student_id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  matricNo: varchar("matric_no", { length: 50 }).notNull(),
  ...timestamps
});


export const courses = pgTable('courses', {
  courseId: serial("course_id").primaryKey(),
  courseName: text('course_name').notNull(),
  courseCode: text('course_code').notNull().unique(),
  courseDesc: text('course_desc').notNull(),
  courseUnit: integer('course_unit').notNull(),
  ...timestamps
});


export const authorizedDevices = pgTable('authorized_devices', {
  deviceId: serial('device_id').primaryKey(),
  studentId: integer('student_id').references(() => students.studentId),
  deviceUUID: varchar('device_uuid', {length: 100}).notNull(),
  deviceType: varchar('device_type', {length: 50, enum:["Laptop", "Phone"]}),
  status: varchar('status', {length: 30}).notNull(),
  authorizedAt: timestamp('authorized_at').defaultNow(),
  ...timestamps
});

export const lectureSessions = pgTable('lecture_sessions', {
  sessionId: serial("session_id").primaryKey(),
  courseId: integer("course_id").references(() => courses.courseId),
  sessionDatetime: timestamp('session_datetime').defaultNow(),
  duration: integer('duration').notNull(),
  ...timestamps
});

export const attendanceRecords = pgTable('attendance_records', {
  recordId: serial('record_id').primaryKey(),
  sessionId: integer('session_id').references(() => lectureSessions.sessionId),
  studentId: integer('student_id').references(() => students.studentId),
  attendanceRecord: integer('attendance_record').notNull(),
  markedAt: timestamp('marked_at').defaultNow(),
  ...timestamps
});