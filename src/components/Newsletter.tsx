'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Fieldset,
  Label,
  Legend,
} from '@headlessui/react'
import { CheckCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import { subscribeToNewsletter } from '@/app/actions/newsletter'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ModalOverlay } from '@/components/ModalOverlay'

// Matches Header `mobileNavSpring`
const panelSpring = {
  type: 'spring' as const,
  bounce: 0.28,
  duration: 0.55,
}

const messageSpring = {
  type: 'spring' as const,
  bounce: 0.22,
  duration: 0.48,
}

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

  let panelTransition = reduceMotion ? { duration: 0 } : panelSpring
  let messageTransition = reduceMotion ? { duration: 0 } : messageSpring

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
        className="rounded-2xl border border-border p-6"
      >
        <Fieldset>
          <Legend className="flex text-sm font-semibold text-foreground">
            <EnvelopeIcon className="size-6 flex-none text-muted-foreground" />
            <span className="ml-3">Stay up to date</span>
          </Legend>
          <Field className="mt-2">
            <Label className="sr-only">Email address</Label>
            <Description className="text-sm text-muted-foreground">
              Join 1,400+ other readers. Get notified when I publish something
              new, and unsubscribe at any time.
            </Description>
            <div className="mt-6 flex items-center gap-4">
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

      <AnimatePresence>
        {dialogOpen && (
          <Dialog
            static
            open={dialogOpen}
            onClose={setDialogOpen}
            className="relative z-50"
          >
            <ModalOverlay
              aria-label="Close dialog"
              onClose={() => setDialogOpen(false)}
            />

            <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
              <DialogPanel className="pointer-events-auto w-full max-w-sm">
                <motion.div
                  initial={
                    reduceMotion ? false : { opacity: 0, scale: 0.95, y: 8 }
                  }
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={
                    reduceMotion ? undefined : { opacity: 0, scale: 0.95, y: 8 }
                  }
                  transition={panelTransition}
                  className="overflow-hidden rounded-2xl bg-card p-6 shadow-lg ring-1 shadow-foreground/5 ring-border"
                >
                  <CheckCircleIcon className="mb-4! size-6 flex-none text-accent" />
                  <DialogTitle className="text-base font-semibold tracking-tight text-foreground">
                    You&apos;re on the list
                  </DialogTitle>
                  <Description className="mt-2 text-sm/6 text-muted-foreground">
                    Check your email to confirm. I&apos;ll send you a note when
                    I publish something new.
                  </Description>
                  <Button
                    type="button"
                    variant="secondary"
                    className="mt-6"
                    onClick={() => setDialogOpen(false)}
                  >
                    Got it, thanks!
                  </Button>
                </motion.div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}
