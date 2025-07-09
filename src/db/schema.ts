import { pgTable, serial, text, varchar, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
  email: varchar('email', { length: 256 }).notNull().unique(),
  password: text('password').notNull(),
});

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  userId: integer('user_id').references(() => users.id),
});

export const schedule = pgTable('schedule', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id').references(() => courses.id),
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
