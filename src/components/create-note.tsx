'use client'

import { Loader2, Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { useState } from 'react'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Props = {}
const CreateNote = (props: Props) => {
  // initialize router instance to navigate to new notebook route
  const router = useRouter()

  // store notebook name in state
  const [input, setInput] = useState('')

  const uploadToFirebase = useMutation({
    mutationFn: async (noteId: string) => {
      const response = await axios.post('/api/firebase-upload', {
        noteId,
      })
      return response.data
    },
  })

  const createNotebook = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/create-notebook', {
        name: input,
      })
      return response.data
    },
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent form from refreshing the page until notebook has been created with an image url
    event.preventDefault()

    // check for empty input
    if (input === '') {
      window.alert('Please enter a notebook name')
      return
    }

    // create notebook
    createNotebook.mutate(undefined, {
      onSuccess: ({ noteId }) => {
        console.log('created new notebook: ', noteId)
        // TODO: upload DALLE image to firebase storage, update imageUrl and redirect to new notebook route
        uploadToFirebase.mutate(noteId)
        router.push(`/notebook/${noteId}`)
      },
      onError: (error) => {
        console.error('error creating new note: ', error)
        window.alert('Failed to create new notebook')
      },
    })
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className="border-dashed border-2 border-green-600 h-full rounded-lg items-center justify-center 
        p-4 flex flex-row sm:flex-col hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          <Plus className="w-6 h-6 text-green-600" strokeWidth={3} />
          <span className="text-green-600 font-semibold sm:mt-2">
            Create Note
          </span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Note</DialogTitle>
          <DialogDescription>
            You can create a new note by clicking the button below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            className="mb-7"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Notebook Name"
          />
          <div className="flex items-center gap-2">
            <Button type="reset" variant={'secondary'}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600"
              disabled={createNotebook.isLoading}
            >
              {createNotebook.isLoading ? (
                <Loader2 className="w-6 h-6 items-center justify-center animate-spin" />
              ) : (
                'Create'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
export default CreateNote
