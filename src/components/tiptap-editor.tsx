'use client'
import { NoteType } from '@/lib/db/schema'
import React, { useEffect, useRef, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import Text from '@tiptap/extension-text'
import TipTapMenubar from './tiptap-menubar'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useDebounce } from '@/lib/debounce'
import { useCompletion } from 'ai/react'

type TipTapEditorProps = {
  note: NoteType
}

const TipTapEditor = (props: TipTapEditorProps) => {
  const [editorState, setEditorState] = useState(props.note.editorState || '')

  // complete function is used to trigger the completion endpoint
  // completion is the React state of the OpenAI completion tokens
  const { complete, completion } = useCompletion({
    api: '/api/completion',
  })

  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/save-note', {
        noteId: props.note.id,
        editorState,
      })
      return response.data
    },
  })

  const debouncedEditorState = useDebounce(editorState, 1000)
  useEffect(() => {
    if (debouncedEditorState === '') return
    saveNote.mutate(undefined, {
      onSuccess: (data) => {
        console.log('editor state saved!', data)
      },
      onError: (error) => {
        console.error(error)
      },
    })
  }, [debouncedEditorState])

  const customText = Text.extend({
    // returns an object with callbacks that execute when the keyboard shortcut is pressed
    addKeyboardShortcuts() {
      return {
        'Shift-a': () => {
          console.log('Shift-a pressed')
          const prompt = this.editor.getText().split(' ').slice(-30).join('')
          complete(prompt)
          return true
        },
      }
    },
  })

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML())
    },
  })

  // store ref to current completion tokens
  const completionRef = useRef('')

  useEffect(() => {
    if (!editor || !completion) return
    // prevent duplicate tokens from being inserted
    // diff is the new content to be inserted
    const diff = completion.slice(completionRef.current.length)
    // update ref to include the new tokens
    completionRef.current = completion
    // insert the new content
    editor.commands.insertContent(diff)
  }, [completion, editor])

  return (
    <>
      <div className="flex">
        {editor && <TipTapMenubar editor={editor} />}
        <Button className="mx-auto" disabled variant={'outline'}>
          {saveNote.isLoading ? 'Saving...' : 'Saved'}
        </Button>
      </div>
      <div className="prose prose-sm w-full mt-4 mb-2">
        <EditorContent editor={editor} />
      </div>
      <span className="text-sm">
        Tip: Press{' '}
        <kbd className="px-2 py-1.5 text-xs text-gray-800 font-semibold bg-gray-100 border border-gray-200 rounded-lg">
          Shift + a
        </kbd>{' '}
        for AI autocompletion
      </span>
    </>
  )
}

export default TipTapEditor
