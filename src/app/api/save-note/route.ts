// endpoint: /api/save-note

import { db } from '@/lib/db'
import { notes } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
    const body = await req.json()
    const { noteId, editorState } = body

    if (!noteId || !editorState) {
      return new NextResponse('Missing noteId or editorState', { status: 400 })
    }

    const entries = await db
      .select()
      .from(notes)
      .where(eq(notes.id, parseInt(noteId)))
    if (entries.length !== 1) {
      return new NextResponse('Note not found', { status: 500 })
    }

    const note = entries[0]
    if (note.editorState !== editorState) {
      await db
        .update(notes)
        .set({ editorState })
        .where(eq(notes.id, parseInt(noteId)))
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
