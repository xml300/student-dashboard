import { pgTable, serial, text, varchar, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

const timestamps = {
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).defaultNow().$onUpdate(() => new Date())
};


export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: text('password').notNull(),
});

export const courses = pgTable('courses', {
  courseId: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  userId: integer('user_id').references(() => users.id),
});

export const schedule = pgTable('schedule', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id').references(() => courses.courseId),
  dayOfWeek: integer('day_of_week').notNull(),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
});

export const attendance = pgTable('attendance', {
  id: serial('id').primaryKey(),
  scheduleId: integer('schedule_id').references(() => schedule.id),
  date: timestamp('date').notNull(),
  present: boolean('present').notNull(),
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


export const students = pgTable('students', {
  studentId: serial('student_id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  matricNo: varchar("matric_no", { length: 50 }).notNull(),
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