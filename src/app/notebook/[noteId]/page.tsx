import DeleteButton from '@/components/delete-button'
import TipTapEditor from '@/components/tiptap-editor'
import { Button } from '@/components/ui/button'
import { clerk } from '@/lib/clerk-server'
import { db } from '@/lib/db'
import { notes } from '@/lib/db/schema'
import { auth } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

type NotebookPageProps = {
  params: {
    noteId: string
  }
}

const NotebookPage = async (props: NotebookPageProps) => {
  // Redirect to dashboard if not logged in
  const { userId } = await auth()
  if (!userId) return redirect('/dashboard')
  // TODO: get user object to customize page
  const user = await clerk.users.getUser(userId)

  // query db for users notebook data
  const notebook = await db
    .select()
    .from(notes)
    .where(
      and(
        eq(notes.id, parseInt(props.params.noteId)),
        eq(notes.username, userId)
      )
    )
  // check that only one notebook was returned
  if (notebook.length !== 1) return redirect('/dashboard')
  const data = notebook[0]

  return (
    <div className="min-h-screen bgGradient p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center p-4 border shadow-xl border-stone-200 rounded-lg">
          <Link href={'/dashboard'}>
            <Button className="bg-green-600" size={'sm'}>
              Back
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className="font-semibold">
            {user.firstName} {user.lastName}
          </span>
          <span className="inline-block mx-1">/</span>
          <span className="text-stone-500 font-semibold">{data.title}</span>
          <div className="ml-auto">
            <DeleteButton noteId={data.id} />
          </div>
        </div>
        <div className="h-8"></div>
        <div className="w-full py-8 px-16 border border-stone-200 shadow-xl rounded-lg">
          <TipTapEditor note={data} />
        </div>
      </div>
    </div>
  )
}

export default NotebookPage
