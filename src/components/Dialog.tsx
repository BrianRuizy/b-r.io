'use client'

import { createContext, useContext } from 'react'
import {
  Description as HeadlessDescription,
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle as HeadlessDialogTitle,
} from '@headlessui/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'
import { bouncySpring, motionTransition, overlayFade } from '@/lib/transitions'

type DialogContextValue = {
  open: boolean
  onClose: (open: boolean) => void
}

const DialogContext = createContext<DialogContextValue | null>(null)

function useDialog() {
  let context = useContext(DialogContext)
  if (!context) {
    throw new Error('Dialog components must be used within <Dialog>')
  }
  return context
}

function Dialog({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: (open: boolean) => void
  children: React.ReactNode
}) {
  return (
    <DialogContext.Provider value={{ open, onClose }}>
      {/* `static` keeps the tree mounted so AnimatePresence can play exits */}
      <HeadlessDialog
        static
        open={open}
        onClose={onClose}
        className="relative z-50"
      >
        <AnimatePresence>{open ? children : null}</AnimatePresence>
      </HeadlessDialog>
    </DialogContext.Provider>
  )
}

function DialogOverlay({
  className,
  onClose,
  'aria-label': ariaLabel = 'Close',
}: {
  className?: string
  onClose?: () => void
  'aria-label'?: string
}) {
  let reduceMotion = useReducedMotion()
  let dialog = useContext(DialogContext)

  let handleClose = onClose ?? (() => dialog?.onClose(false))

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      className={cn(
        'fixed inset-0 isolate z-50 bg-black/10 supports-backdrop-filter:backdrop-blur-xs',
        className,
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={motionTransition(overlayFade, reduceMotion)}
      onClick={handleClose}
    />
  )
}

function DialogContent({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  let { onClose } = useDialog()
  let reduceMotion = useReducedMotion()
  let panelTransition = motionTransition(bouncySpring, reduceMotion)

  return (
    <>
      <DialogOverlay
        key="backdrop"
        aria-label="Close dialog"
        onClose={() => onClose(false)}
      />

      <motion.div
        key="panel"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, scale: 0.92, y: 12 }}
        transition={panelTransition}
        className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <DialogPanel
          className={cn(
            'pointer-events-auto flex w-full max-w-sm flex-col gap-4 overflow-hidden rounded-2xl bg-card p-6 shadow-lg ring-1 shadow-foreground/5 ring-border',
            className,
          )}
        >
          {children}
        </DialogPanel>
      </motion.div>
    </>
  )
}

function DialogHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('flex flex-col gap-2', className)} {...props} />
}

function DialogTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof HeadlessDialogTitle>) {
  return (
    <HeadlessDialogTitle
      className={cn(
        'text-base font-semibold tracking-tight text-foreground',
        className,
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof HeadlessDescription>) {
  return (
    <HeadlessDescription
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
}
