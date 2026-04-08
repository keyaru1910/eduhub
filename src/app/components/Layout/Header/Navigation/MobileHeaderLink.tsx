import { useState } from 'react'
import Link from 'next/link'
import { HeaderItem } from '../../../../types/menu'

const MobileHeaderLink: React.FC<{
  item: HeaderItem
  onNavigate?: () => void
}> = ({ item, onNavigate }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen)
  }

  return (
    <div className='relative w-full'>
      <Link
        href={item.href}
        onClick={
          item.submenu
            ? (event) => {
                event.preventDefault()
                handleToggle()
              }
            : onNavigate
        }
        className='flex w-full items-center justify-between py-2 text-black focus:outline-hidden dark:text-white'>
        {item.label}
        {item.submenu && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1.5em'
            height='1.5em'
            viewBox='0 0 24 24'>
            <path
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              d='m7 10l5 5l5-5'
            />
          </svg>
        )}
      </Link>
      {submenuOpen && item.submenu && (
        <div className='w-full bg-white p-2 dark:bg-slate-900'>
          {item.submenu.map((subItem, index) => (
            <Link
              key={index}
              href={subItem.href}
              onClick={onNavigate}
              className='block rounded-md py-2 text-gray-500 hover:bg-gray-200 dark:text-slate-300 dark:hover:bg-slate-800'>
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default MobileHeaderLink
