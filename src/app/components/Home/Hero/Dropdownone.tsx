'use client'
import { Fragment, useState } from 'react'
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    Transition,
} from '@headlessui/react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { CourseType } from '@/app/types/course'

const Dropdown = ({ options }: { options: CourseType[] }) => {
    const [selected, setSelected] = useState<CourseType | null>(options[0] ?? null)

    return (
        <div className='w-full'>
            <p className='text-lg text-gray-500 dark:text-slate-300'>Bạn muốn học gì?</p>
            <Listbox value={selected} onChange={setSelected}>
                <div className='relative mt-1'>
                    <ListboxButton className='relative w-full cursor-default rounded-lg bg-white py-2 pr-10 text-left text-xl focus:outline-hidden focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:ring-offset-cream hover:cursor-pointer dark:bg-slate-900 dark:text-white sm:text-sm'>
                        <span className='block truncate text-xl font-semibold'>
                            {selected?.name}
                        </span>
                        <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                            <Icon
                                icon='tabler:chevron-down'
                                className='text-gray-400 inline-block text-xl me-2 dark:text-slate-400'
                            />
                        </span>
                    </ListboxButton>
                    <Transition
                        as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'>
                        <ListboxOptions className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden dark:bg-slate-900 dark:text-white dark:ring-white/10 sm:text-sm'>
                            {options.map((person, personIdx) => (
                                <ListboxOption
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-cream text-primary dark:bg-slate-800 dark:text-white' : 'text-gray-900 dark:text-slate-200'
                                        }`
                                    }
                                    value={person}>
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}>
                                                {person.name}
                                            </span>
                                            {selected ? (
                                                <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-primary'>
                                                    <Icon
                                                        icon='tabler:check'
                                                        className='text-xl inline-block me-2'
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}

export default Dropdown
