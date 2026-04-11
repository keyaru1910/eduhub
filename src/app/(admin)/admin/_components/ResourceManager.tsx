'use client'

import { useState, useTransition } from 'react'

type FieldType = 'text' | 'number' | 'textarea' | 'checkbox'

type FieldConfig = {
  name: string
  label: string
  type?: FieldType
  placeholder?: string
}

type ResourceManagerProps<T extends { id: string }> = {
  title: string
  description: string
  endpoint: string
  fields: FieldConfig[]
  initialItems: T[]
  getInitialValues: () => Record<string, string | boolean>
}

const ResourceManager = <T extends { id: string }>({
  title,
  description,
  endpoint,
  fields,
  initialItems,
  getInitialValues,
}: ResourceManagerProps<T>) => {
  const [items, setItems] = useState(initialItems)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formValues, setFormValues] = useState(getInitialValues())
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setMessage('')

    const payload = new FormData()
    for (const [key, value] of Object.entries(formValues)) {
      payload.append(key, String(value))
    }

    startTransition(async () => {
      const response = await fetch(editingId ? `${endpoint}/${editingId}` : endpoint, {
        method: editingId ? 'PATCH' : 'POST',
        body: payload,
      })
      const result = await response.json()

      if (!response.ok || !result.success) {
        setError(result.error || 'Khong the luu du lieu.')
        return
      }

      const nextItems = editingId
        ? items.map((item) => (item.id === editingId ? result.data : item))
        : [result.data, ...items]
      setItems(nextItems)
      setEditingId(null)
      setFormValues(getInitialValues())
      setMessage(editingId ? 'Cap nhat thanh cong.' : 'Tao moi thanh cong.')
    })
  }

  const remove = (id: string) => {
    setError('')
    setMessage('')

    startTransition(async () => {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE',
      })
      const result = await response.json()

      if (!response.ok || !result.success) {
        setError(result.error || 'Khong the xoa du lieu.')
        return
      }

      setItems((current) => current.filter((item) => item.id !== id))
      setMessage('Da xoa ban ghi.')
    })
  }

  const beginEdit = (item: T) => {
    setEditingId(item.id)
    const nextValues: Record<string, string | boolean> = {}
    for (const field of fields) {
      const value = item[field.name as keyof T]
      nextValues[field.name] = Array.isArray(value)
        ? value.join('\n')
        : typeof value === 'boolean'
          ? value
          : String(value ?? '')
    }
    setFormValues(nextValues)
  }

  return (
    <div className='space-y-6'>
      <section className='rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900'>
        <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
          {title}
        </p>
        <h2 className='mt-3 text-3xl font-bold text-slate-950 dark:text-white'>
          {editingId ? 'Cap nhat ban ghi' : 'Tao ban ghi moi'}
        </h2>
        <p className='mt-2 text-sm text-slate-600 dark:text-slate-300'>
          {description}
        </p>
        <form className='mt-8 grid gap-4 md:grid-cols-2' onSubmit={submit}>
          {fields.map((field) => (
            <label key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
              <span className='mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200'>
                {field.label}
              </span>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  rows={4}
                  placeholder={field.placeholder}
                  value={String(formValues[field.name] ?? '')}
                  onChange={(event) =>
                    setFormValues((current) => ({
                      ...current,
                      [field.name]: event.target.value,
                    }))
                  }
                  className='w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-white/10 dark:bg-slate-950 dark:text-white'
                />
              ) : field.type === 'checkbox' ? (
                <input
                  type='checkbox'
                  name={field.name}
                  checked={Boolean(formValues[field.name])}
                  onChange={(event) =>
                    setFormValues((current) => ({
                      ...current,
                      [field.name]: event.target.checked,
                    }))
                  }
                  className='h-5 w-5 rounded border-slate-300'
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={String(formValues[field.name] ?? '')}
                  onChange={(event) =>
                    setFormValues((current) => ({
                      ...current,
                      [field.name]: event.target.value,
                    }))
                  }
                  className='w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-white/10 dark:bg-slate-950 dark:text-white'
                />
              )}
            </label>
          ))}
          <div className='md:col-span-2 flex gap-3'>
            <button
              type='submit'
              disabled={isPending}
              className='rounded-2xl border border-primary bg-primary px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-70'
            >
              {editingId ? 'Luu thay doi' : 'Tao moi'}
            </button>
            {editingId && (
              <button
                type='button'
                className='rounded-2xl border border-slate-300 px-5 py-3 dark:border-white/10 dark:text-white'
                onClick={() => {
                  setEditingId(null)
                  setFormValues(getInitialValues())
                }}
              >
                Huy
              </button>
            )}
          </div>
        </form>
        {error && <p className='mt-4 text-sm text-red-500'>{error}</p>}
        {message && <p className='mt-4 text-sm text-green-600'>{message}</p>}
      </section>

      <section className='rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900'>
        <h3 className='text-2xl font-bold text-slate-950 dark:text-white'>Danh sach</h3>
        <div className='mt-6 grid gap-4'>
          {items.map((item) => (
            <div
              key={item.id}
              className='rounded-2xl border border-slate-200 px-5 py-4 dark:border-white/10'
            >
              <pre className='overflow-auto whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-200'>
                {JSON.stringify(item, null, 2)}
              </pre>
              <div className='mt-4 flex gap-3'>
                <button
                  type='button'
                  onClick={() => beginEdit(item)}
                  className='rounded-xl border border-slate-300 px-4 py-2 text-sm dark:border-white/10 dark:text-white'
                >
                  Sua
                </button>
                <button
                  type='button'
                  onClick={() => remove(item.id)}
                  className='rounded-xl border border-red-300 px-4 py-2 text-sm text-red-600'
                >
                  Xoa
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className='text-sm text-slate-500 dark:text-slate-300'>
              Chua co du lieu trong bang nay.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default ResourceManager
