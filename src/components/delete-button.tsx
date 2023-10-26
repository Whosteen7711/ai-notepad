'use client'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type DeleteButtonProps = {
  noteId: number
}

const DeleteButton = ({ noteId }: DeleteButtonProps) => {
  const router = useRouter()

  const deleteNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/delete-note', {
        noteId,
      })
      return response.data
    },
  })
  return (
    <Button
      variant={'destructive'}
      size={'sm'}
      disabled={deleteNote.isLoading}
      onClick={() => {
        const confirm = window.confirm(
          'Are you sure you want to delete this note?'
        )
        if (!confirm) return
        deleteNote.mutate(undefined, {
          onSuccess: () => {
            router.push('/dashboard')
          },
          onError: (error) => {
            console.error(error)
          },
        })
      }}
    >
      <Trash />
    </Button>
  )
}

export default DeleteButton
