import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const notes = pgTable('notes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  imageUrl: text('image_url'),
  username: text('username').notNull(),
  editorState: text('editor_state'),
})

export type NoteType = typeof notes.$inferInsert
