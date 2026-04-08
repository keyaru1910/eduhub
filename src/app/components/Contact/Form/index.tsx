'use client'
import React from 'react'
import { useState, useEffect } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phnumber: '',
    Message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [showThanks, setShowThanks] = useState(false)
  const [loader, setLoader] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    const isValid = Object.values(formData).every(
      (value) => value.trim() !== ''
    )
    setIsFormValid(isValid)
  }, [formData])
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  const reset = () => {
    formData.firstname = ''
    formData.lastname = ''
    formData.email = ''
    formData.phnumber = ''
    formData.Message = ''
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoader(true)

    fetch('https://formsubmit.co/ajax/bhainirav772@gmail.com', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        Name: formData.firstname,
        LastName: formData.lastname,
        Email: formData.email,
        PhoneNo: formData.phnumber,
        Message: formData.Message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSubmitted(true)
          setShowThanks(true)
          reset()

          setTimeout(() => {
            setShowThanks(false)
          }, 5000)
        }

        reset()
      })
      .catch((error) => {
        setLoader(false)
        console.log(error.message)
      })
  }
  return (
    <section id='contact'>
      <div className='container'>
        <div className='relative'>
          <h2 className='mb-9 font-bold tracking-tight'>Liên hệ với chúng tôi</h2>
          <form
            onSubmit={handleSubmit}
            className='flex flex-wrap w-full m-auto justify-between'>
            <div className='sm:flex gap-3 w-full'>
              <div className='mx-0 my-2.5 flex-1'>
                <label htmlFor='fname' className='pb-3 inline-block text-base dark:text-slate-200'>
                  Tên
                </label>
                <input
                  id='fname'
                  type='text'
                  name='firstname'
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder='Nguyễn'
                  className='w-full rounded-2xl border border-solid px-4 py-2.5 text-base transition-all duration-500 focus:border-primary focus:outline-0 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400'
                />
              </div>
              <div className='mx-0 my-2.5 flex-1'>
                <label htmlFor='lname' className='pb-3 inline-block text-base dark:text-slate-200'>
                  Họ
                </label>
                <input
                  id='lname'
                  type='text'
                  name='lastname'
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder='Văn A'
                  className='w-full rounded-2xl border border-solid px-4 py-2.5 text-base transition-all duration-500 focus:border-primary focus:outline-0 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400'
                />
              </div>
            </div>
            <div className='sm:flex gap-3 w-full'>
              <div className='mx-0 my-2.5 flex-1'>
                <label htmlFor='email' className='pb-3 inline-block text-base dark:text-slate-200'>
                  Địa chỉ email
                </label>
                <input
                  id='email'
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='john.doe@example.com'
                  className='w-full rounded-2xl border border-solid px-4 py-2.5 text-base transition-all duration-500 focus:border-primary focus:outline-0 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400'
                />
              </div>
              <div className='mx-0 my-2.5 flex-1'>
                <label
                  htmlFor='Phnumber'
                  className='pb-3 inline-block text-base dark:text-slate-200'>
                  Số điện thoại
                </label>
                <input
                  id='Phnumber'
                  type='tel'
                  name='phnumber'
                  placeholder='+1234567890'
                  value={formData.phnumber}
                  onChange={handleChange}
                  className='w-full rounded-2xl border border-solid px-4 py-2.5 text-base transition-all duration-500 focus:border-primary focus:outline-0 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400'
                />
              </div>
            </div>
            <div className='w-full mx-0 my-2.5 flex-1'>
              <label htmlFor='message' className='inline-block text-base dark:text-slate-200'>
                Tin nhắn
              </label>
              <textarea
                id='message'
                name='Message'
                value={formData.Message}
                onChange={handleChange}
                className='mt-2 w-full rounded-2xl border border-solid px-5 py-3 transition-all duration-500 focus:border-primary focus:outline-0 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400'
                placeholder='Bạn muốn trao đổi thêm điều gì?'></textarea>
            </div>
            <div className='mx-0 my-2.5 w-full'>
              <button
                type='submit'
                disabled={!isFormValid || loader}
                className={`border leading-none px-6 text-lg font-medium py-4 rounded-full 
                    ${
                      !isFormValid || loader
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-primary border-primary text-white hover:bg-transparent hover:text-primary cursor-pointer'
                    }`}>
                Gửi liên hệ
              </button>
            </div>
          </form>
          {showThanks && (
            <div className='text-white bg-primary rounded-full px-4 text-lg mb-4.5 mt-1 absolute flex items-center gap-2'>
              Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.
              <div className='w-3 h-3 rounded-full animate-spin border-2 border-solid border-white border-t-transparent'></div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactForm
