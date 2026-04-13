'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import withBasePath from '@/utils/basePath'

type FieldType = 'text' | 'number' | 'textarea' | 'checkbox'

type FieldConfig = {
  name: string
  label: string
  type?: FieldType
  placeholder?: string
  description?: string
}

type ResourceManagerProps<T extends { id: string }> = {
  title: string
  description: string
  endpoint: string
  fields: FieldConfig[]
  initialItems: T[]
  getInitialValues: () => Record<string, string | boolean>
  emptyStateTitle: string
  emptyStateDescription: string
  itemTitle: (item: T) => string
  itemSubtitle?: (item: T) => string
  itemDescription?: (item: T) => string
  itemMeta?: (item: T) => string[]
  imageFieldName?: string
}

const prettifyValue = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.join(', ')
  }

  if (typeof value === 'boolean') {
    return value ? 'Đang hiển thị' : 'Đã ẩn'
  }

  return String(value ?? '')
}

const ResourceManager = <T extends { id: string }>({
  title,
  description,
  endpoint,
  fields,
  initialItems,
  getInitialValues,
  emptyStateTitle,
  emptyStateDescription,
  itemTitle,
  itemSubtitle,
  itemDescription,
  itemMeta,
  imageFieldName,
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
        setError(result.error || 'Không thể lưu dữ liệu.')
        return
      }

      const nextItems = editingId
        ? items.map((item) => (item.id === editingId ? result.data : item))
        : [result.data, ...items]
      setItems(nextItems)
      setEditingId(null)
      setFormValues(getInitialValues())
      setMessage(editingId ? 'Cập nhật thành công.' : 'Tạo mới thành công.')
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
        setError(result.error || 'Không thể xóa dữ liệu.')
        return
      }

      setItems((current) => current.filter((item) => item.id !== id))
      setMessage('Đã xóa bản ghi.')
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
          {editingId ? 'Cập nhật nội dung' : 'Tạo nội dung mới'}
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
              {field.description && (
                <span className='mb-2 block text-xs leading-5 text-slate-500 dark:text-slate-400'>
                  {field.description}
                </span>
              )}
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
          {imageFieldName && typeof formValues[imageFieldName] === 'string' && formValues[imageFieldName] ? (
            <div className='md:col-span-2 rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-4'>
              <p className='text-sm font-medium text-slate-700 dark:text-slate-200'>
                Xem trước hình ảnh
              </p>
              <div className='mt-3 flex items-center gap-4'>
                <div className='relative h-24 w-24 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800'>
                  <Image
                    src={withBasePath(String(formValues[imageFieldName]))}
                    alt='Preview'
                    fill
                    className='object-cover'
                    sizes='96px'
                  />
                </div>
                <p className='text-sm text-slate-500 dark:text-slate-400'>
                  Kiểm tra nhanh đường dẫn ảnh trước khi lưu để tránh lỗi hiển thị trên trang public.
                </p>
              </div>
            </div>
          ) : null}
          <div className='md:col-span-2 flex gap-3'>
            <button
              type='submit'
              disabled={isPending}
              className='rounded-2xl border border-primary bg-primary px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-70'
            >
              {editingId ? 'Lưu thay đổi' : 'Tạo mới'}
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
                Hủy
              </button>
            )}
          </div>
        </form>
        {error && <p className='mt-4 text-sm text-red-500'>{error}</p>}
        {message && <p className='mt-4 text-sm text-green-600'>{message}</p>}
      </section>

      <section className='rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <h3 className='text-2xl font-bold text-slate-950 dark:text-white'>Danh sách hiện có</h3>
            <p className='text-sm text-slate-500 dark:text-slate-400'>
              {items.length} bản ghi đang được quản lý trong mục này.
            </p>
          </div>
        </div>
        <div className='mt-6 grid gap-4'>
          {items.map((item) => (
            <div
              key={item.id}
              className='rounded-2xl border border-slate-200 p-5 dark:border-white/10'
            >
              <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
                <div className='flex min-w-0 flex-1 gap-4'>
                  {imageFieldName &&
                  typeof item[imageFieldName as keyof T] === 'string' &&
                  item[imageFieldName as keyof T] ? (
                    <div className='relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800'>
                      <Image
                        src={withBasePath(String(item[imageFieldName as keyof T]))}
                        alt={itemTitle(item)}
                        fill
                        className='object-cover'
                        sizes='80px'
                      />
                    </div>
                  ) : null}
                  <div className='min-w-0'>
                    <h4 className='text-xl font-semibold text-slate-950 dark:text-white'>
                      {itemTitle(item)}
                    </h4>
                    {itemSubtitle && (
                      <p className='mt-1 text-sm font-medium text-primary'>
                        {itemSubtitle(item)}
                      </p>
                    )}
                    {itemDescription && (
                      <p className='mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300'>
                        {itemDescription(item)}
                      </p>
                    )}
                    {itemMeta && (
                      <div className='mt-3 flex flex-wrap gap-2'>
                        {itemMeta(item).map((meta) => (
                          <span
                            key={meta}
                            className='rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200'
                          >
                            {meta}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className='rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500 dark:border-white/10 dark:text-slate-300'>
                  {editingId === item.id ? 'Đang chỉnh sửa' : 'Sẵn sàng cập nhật'}
                </div>
              </div>
              <dl className='mt-5 grid gap-3 md:grid-cols-2'>
                {fields.map((field) => (
                  <div
                    key={`${item.id}-${field.name}`}
                    className='rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950'
                  >
                    <dt className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400'>
                      {field.label}
                    </dt>
                    <dd className='mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-slate-200'>
                      {prettifyValue(item[field.name as keyof T])}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className='mt-4 flex gap-3'>
                <button
                  type='button'
                  onClick={() => beginEdit(item)}
                  className='rounded-xl border border-slate-300 px-4 py-2 text-sm dark:border-white/10 dark:text-white'
                >
                  Sửa
                </button>
                <button
                  type='button'
                  onClick={() => remove(item.id)}
                  className='rounded-xl border border-red-300 px-4 py-2 text-sm text-red-600'
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className='rounded-2xl border border-dashed border-primary/25 bg-primary/5 p-6'>
              <p className='text-lg font-semibold text-slate-950 dark:text-white'>
                {emptyStateTitle}
              </p>
              <p className='mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300'>
                {emptyStateDescription}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ResourceManager
