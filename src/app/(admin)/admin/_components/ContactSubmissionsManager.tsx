'use client'

import { useState, useTransition } from 'react'
import type { ContactSubmissionAdminItem, ContactSubmissionStatus } from '@/types/backend'

type ContactSubmissionsManagerProps = {
  initialItems: ContactSubmissionAdminItem[]
}

const statusOptions: ContactSubmissionStatus[] = ['NEW', 'CONTACTED', 'CLOSED']

const statusLabel: Record<ContactSubmissionStatus, string> = {
  NEW: 'Moi',
  CONTACTED: 'Da lien he',
  CLOSED: 'Da dong',
}

const ContactSubmissionsManager = ({
  initialItems,
}: ContactSubmissionsManagerProps) => {
  const [items, setItems] = useState(initialItems)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()

  const updateItem = (id: string, field: 'status' | 'note', value: string) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    )
  }

  const saveItem = (id: string) => {
    const item = items.find((entry) => entry.id === id)

    if (!item) {
      return
    }

    setError('')
    setMessage('')

    const payload = new FormData()
    payload.append('status', item.status)
    payload.append('note', item.note || '')

    startTransition(async () => {
      const response = await fetch(`/api/admin/contact-submissions/${id}`, {
        method: 'PATCH',
        body: payload,
      })
      const result = await response.json()

      if (!response.ok || !result.success) {
        setError(result.error || 'Khong the cap nhat lead.')
        return
      }

      setItems((current) => current.map((entry) => (entry.id === id ? result.data : entry)))
      setMessage('Cap nhat lead thanh cong.')
    })
  }

  return (
    <section className='rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900'>
      <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
        Contact Leads
      </p>
      <h2 className='mt-3 text-3xl font-bold text-slate-950 dark:text-white'>
        Quan ly lien he tu form public
      </h2>
      <p className='mt-2 text-sm text-slate-600 dark:text-slate-300'>
        Theo doi lead moi, them ghi chu noi bo va cap nhat trang thai xu ly.
      </p>

      <div className='mt-8 grid gap-4'>
        {items.map((item) => (
          <article
            key={item.id}
            className='rounded-2xl border border-slate-200 p-5 dark:border-white/10'
          >
            <div className='flex flex-col gap-3 md:flex-row md:items-start md:justify-between'>
              <div>
                <h3 className='text-xl font-semibold text-slate-950 dark:text-white'>
                  {item.firstName} {item.lastName}
                </h3>
                <p className='mt-1 text-sm text-slate-600 dark:text-slate-300'>
                  {item.email} | {item.phone}
                </p>
                <p className='mt-2 text-sm text-slate-500 dark:text-slate-400'>
                  {new Date(item.createdAt).toLocaleString('vi-VN')}
                </p>
              </div>
              <div className='rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200'>
                {statusLabel[item.status]}
              </div>
            </div>

            <p className='mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-slate-200'>
              {item.message}
            </p>

            <div className='mt-5 grid gap-4 lg:grid-cols-[220px_1fr_auto]'>
              <label className='text-sm'>
                <span className='mb-2 block font-medium text-slate-700 dark:text-slate-200'>
                  Trang thai
                </span>
                <select
                  value={item.status}
                  onChange={(event) => updateItem(item.id, 'status', event.target.value)}
                  className='w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-white/10 dark:bg-slate-950 dark:text-white'
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {statusLabel[status]}
                    </option>
                  ))}
                </select>
              </label>

              <label className='text-sm'>
                <span className='mb-2 block font-medium text-slate-700 dark:text-slate-200'>
                  Ghi chu noi bo
                </span>
                <textarea
                  rows={3}
                  value={item.note || ''}
                  onChange={(event) => updateItem(item.id, 'note', event.target.value)}
                  className='w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-white/10 dark:bg-slate-950 dark:text-white'
                />
              </label>

              <div className='flex items-end'>
                <button
                  type='button'
                  onClick={() => saveItem(item.id)}
                  disabled={isPending}
                  className='rounded-2xl border border-primary bg-primary px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-70'
                >
                  Luu
                </button>
              </div>
            </div>
          </article>
        ))}

        {items.length === 0 && (
          <p className='text-sm text-slate-500 dark:text-slate-300'>
            Chua co lead nao tu form lien he.
          </p>
        )}
      </div>

      {error && <p className='mt-4 text-sm text-red-500'>{error}</p>}
      {message && <p className='mt-4 text-sm text-green-600'>{message}</p>}
    </section>
  )
}

export default ContactSubmissionsManager
