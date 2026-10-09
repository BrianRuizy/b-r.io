'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Description, Field, Fieldset, Label, Legend } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import { subscribeToNewsletter } from '@/app/actions/newsletter'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import { motionTransition, smoothSpring } from '@/lib/transitions'

const errorMessage = 'Something went wrong. Please try again.'

function SubmitButton() {
  let { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      Subscribe
    </Button>
  )
}

export function Newsletter() {
  let formRef = useRef<HTMLFormElement>(null)
  let [dialogOpen, setDialogOpen] = useState(false)
  let [error, setError] = useState<string | null>(null)
  let reduceMotion = useReducedMotion()

  let messageTransition = motionTransition(smoothSpring, reduceMotion)

  useEffect(() => {
    if (!error) {
      return
    }

    let timer = window.setTimeout(() => {
      setError(null)
    }, 5000)

    return () => window.clearTimeout(timer)
  }, [error])

  async function handleSubmit(formData: FormData) {
    setError(null)

    try {
      await subscribeToNewsletter(formData)
      formRef.current?.reset()
      setDialogOpen(true)
    } catch {
      setError(errorMessage)
      formRef.current
        ?.querySelector<HTMLInputElement>('input[name="email"]')
        ?.focus()
    }
  }

  return (
    <>
      <form
        ref={formRef}
        action={handleSubmit}
        className="rounded-3xl border border-border bg-muted p-7 sm:p-10"
      >
        <Fieldset>
          <Legend className="text-3xl font-semibold tracking-tight text-foreground">
            Stay in the loop
          </Legend>
          <Field className="mt-2">
            <Label className="sr-only">Email address</Label>
            <Description className="block max-w-lg text-base leading-7 text-muted-foreground">
              Join 1,400+ other readers. Get notified when I publish something
              new, and unsubscribe at any time.
            </Description>
            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="min-w-0 flex-auto"
              />
              <SubmitButton />
            </div>
            <AnimatePresence initial={false}>
              {error && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={messageTransition}
                  className="overflow-hidden text-sm text-destructive"
                >
                  <span className="block pt-3">{error}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </Field>
        </Fieldset>
      </form>

      <Dialog open={dialogOpen} onClose={setDialogOpen}>
        <DialogContent>
          <CheckCircleIcon className="size-6 flex-none text-accent" />
          <DialogHeader>
            <DialogTitle>You&apos;re on the list</DialogTitle>
            <DialogDescription>
              Check your email to confirm. I&apos;ll send you a note when I
              publish something new.
            </DialogDescription>
          </DialogHeader>
          <Button
            type="button"
            variant="secondary"
            className="w-fit"
            onClick={() => setDialogOpen(false)}
          >
            Got it, thanks!
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
