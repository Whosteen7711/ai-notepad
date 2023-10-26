// endpoint: /api/firebase-upload
import { db } from '@/lib/db'
import { notes } from '@/lib/db/schema'
import { uploadFileToFirebase } from '@/lib/firebase'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
    const { noteId } = await req.json()

    // get the note entry, upload to firebase, and update the image url
    const entries = await db
      .select()
      .from(notes)
      .where(eq(notes.id, parseInt(noteId)))
    if (entries.length !== 1) {
      return new NextResponse('Failed to find note', { status: 500 })
    }
    if (!entries[0].imageUrl) {
      return new NextResponse('Note does not have an image', { status: 400 })
    }

    const firebaseUrl = await uploadFileToFirebase(
      entries[0].imageUrl,
      entries[0].title
    )
    await db
      .update(notes)
      .set({ imageUrl: firebaseUrl })
      .where(eq(notes.id, parseInt(noteId)))

    return new NextResponse('ok', { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse('error', { status: 500 })
  }
}
