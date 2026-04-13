'use client'

import { useState, useTransition } from 'react'
import type { ContactSubmissionAdminItem, ContactSubmissionStatus } from '@/types/backend'

type ContactSubmissionsManagerProps = {
  initialItems: ContactSubmissionAdminItem[]
}

const statusOptions: ContactSubmissionStatus[] = ['NEW', 'CONTACTED', 'CLOSED']

const statusLabel: Record<ContactSubmissionStatus, string> = {
  NEW: 'Mới',
  CONTACTED: 'Đã liên hệ',
  CLOSED: 'Đã đóng',
}

const ContactSubmissionsManager = ({
  initialItems,
}: ContactSubmissionsManagerProps) => {
  const [items, setItems] = useState(initialItems)
  const [activeFilter, setActiveFilter] = useState<ContactSubmissionStatus | 'ALL'>('ALL')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()

  const visibleItems =
    activeFilter === 'ALL'
      ? items
      : items.filter((item) => item.status === activeFilter)

  const filterChips = [
    { value: 'ALL' as const, label: 'Tất cả', count: items.length },
    ...statusOptions.map((status) => ({
      value: status,
      label: statusLabel[status],
      count: items.filter((item) => item.status === status).length,
    })),
  ]

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
        setError(result.error || 'Không thể cập nhật lead.')
        return
      }

      setItems((current) => current.map((entry) => (entry.id === id ? result.data : entry)))
      setMessage('Cập nhật lead thành công.')
    })
  }

  return (
    <section className='rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900'>
      <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
        Contact Leads
      </p>
      <h2 className='mt-3 text-3xl font-bold text-slate-950 dark:text-white'>
        Quản lý liên hệ từ form public
      </h2>
      <p className='mt-2 text-sm text-slate-600 dark:text-slate-300'>
        Theo dõi lead mới, thêm ghi chú nội bộ và cập nhật trạng thái xử lý ngay trong một màn hình.
      </p>
      <div className='mt-6 flex flex-wrap gap-3'>
        {filterChips.map((chip) => (
          <button
            key={chip.value}
            type='button'
            onClick={() => setActiveFilter(chip.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeFilter === chip.value
                ? 'bg-primary text-white'
                : 'border border-slate-200 text-slate-600 dark:border-white/10 dark:text-slate-300'
            }`}
          >
            {chip.label} ({chip.count})
          </button>
        ))}
      </div>

      <div className='mt-8 grid gap-4'>
        {visibleItems.map((item) => (
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
                  Trạng thái
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
                  Ghi chú nội bộ
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
                  Lưu
                </button>
              </div>
            </div>
          </article>
        ))}

        {visibleItems.length === 0 && (
          <div className='rounded-2xl border border-dashed border-primary/25 bg-primary/5 p-6'>
            <p className='text-lg font-semibold text-slate-950 dark:text-white'>
              {items.length === 0 ? 'Chưa có lead nào từ form liên hệ' : 'Không có lead trong nhóm trạng thái này'}
            </p>
            <p className='mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300'>
              {items.length === 0
                ? 'Hãy gửi thử một form liên hệ ở trang public để hoàn thiện luồng demo end-to-end.'
                : 'Thử chuyển bộ lọc hoặc cập nhật trạng thái lead ở nhóm khác.'}
            </p>
          </div>
        )}
      </div>

      {error && <p className='mt-4 text-sm text-red-500'>{error}</p>}
      {message && <p className='mt-4 text-sm text-green-600'>{message}</p>}
    </section>
  )
}

export default ContactSubmissionsManager
