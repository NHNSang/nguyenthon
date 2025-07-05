'use client'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'


import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ContactSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { FormError } from './FormError'
import { FormSuccess } from './FormSuccess'


import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'


interface ContactFromProps {
  btnColor?: string;
  labelOfForm: string
  classNames?: string | null | undefined;
}


const ContactForm = ({ btnColor, labelOfForm, classNames }: ContactFromProps) => {
  const router = useRouter()


  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();


  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  })


  const onSubmit = (values: z.infer<typeof ContactSchema>) => {
    setError('')
    setSuccess('')


    startTransition(async () => {
      console.log(values)
      try {
        const response = await fetch('https://aqua-pigeon-769011.hostingersite.com/wp-json/wp/v2/contact_submission', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values),
        });


        const result = await response.json();


        if (response.ok) {
          if (result?.success) {
            setSuccess(result.success || 'Gửi thông tin thành công');
            form.reset();
          } else {
            throw new Error(result?.error || 'Gửi yêu cầu đã xảy ra lỗi');
          }
        } else {
          throw new Error('Failed to submit form. Please try again later.');
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      }
    })
  }
  return (
    <div className={`${classNames}bg-[#1E1E1E] relative w-full lg:w-[10/12] h-[550px] p-5  flex flex-col justify-center`}>
      <div className='absolute top-5 left-5 flex flex-row justify-center items-center gap-2 bg-[#1E1E1E] border-none  py-2 mx-auto text-white w-11/12 l'>
        <h2 className='text-center font-extrabold text-3xl '>{labelOfForm}</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className=''
        >
          {/* họ và tên */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <>
                <FormItem className='my-5 relative'>
                  <FormControl className='h-[50px]'>
                    <div className='relative'>
                      <Input
                        className='w-full border-neutral-700 focus:ring-0 shadow-sm rounded-none text-neutral-500 placeholder:text-neutral-400 placeholder:font-normal placeholder:text-xl pl-6'
                        type='text'
                        placeholder='Họ và tên'
                        {...field}
                        value={field.value || ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <>
                <FormItem className='my-5'>
                  <FormControl className='h-[50px]'>
                    <div className='relative'>
                      <Input
                        className='w-full border-neutral-700 focus:ring-0 rounded-none shadow-xl text-neutral-500 placeholder:text-neutral-400 placeholder:font-normal placeholder:text-xl pl-6'
                        type='text'
                        placeholder='Email'
                        {...field}
                      />
                      <span className='absolute left-2 top-[30%] transform -translate-y-1/2 text-red-400 text-xl pointer-events-none z-10'>
                        *
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          {/* Phone */}
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <>
                <FormItem className='my-5'>
                  <FormControl className='h-[50px]'>
                    <div className='relative'>
                      <Input
                        className='w-full border-neutral-700 focus:ring-0 rounded-none shadow-xl text-neutral-500 placeholder:text-neutral-400 placeholder:font-normal placeholder:text-xl pl-6'
                        type='text'
                        placeholder='Điện thoại'
                        {...field}
                      />
                      <span className='absolute left-2 top-[30%] transform -translate-y-1/2 text-red-400 text-xl pointer-events-none z-10'>
                        *
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          {/* Địa chỉ */}
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <>
                <FormItem className='my-5'>
                  <FormControl className='h-[50px]'>
                    <div className='relative'>
                      {/* Đảm bảo value luôn là string để tránh lỗi type */}
                      <Input
                        className='w-full border-neutral-700 focus:ring-0 rounded-none shadow-xl text-neutral-500 placeholder:text-neutral-400 placeholder:font-normal placeholder:text-xl pl-6'
                        type='text'
                        placeholder='Địa chỉ'
                        {...field}
                        value={field.value ?? ''}
                      />

                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <>
                <FormItem className='my-5'>
                  <FormControl className='h-[50px]'>
                    <Textarea
                      {...field}
                      placeholder='Vui lòng để lại yêu cầu của bạn!'
                      className='border-neutral-700 shadow-xl rounded-none text-neutral-500 placeholder:text-neutral-400 placeholder:font-normal placeholder:text-xl'
                    />
                  </FormControl>
                  <FormMessage className='text-destructive' />
                </FormItem>
              </>
            )}
          />
          <div className='my-3'>
            {error ? <FormError message={error} /> : success ? <FormSuccess message={success} /> : null}
          </div>
          <Button
            disabled={isPending}
            type='submit'
            className='w-full border-none bg-primary py-8 px-2'
          >
            <span className='tracking-wide font-extrabold text-2xl text-white '>GỬI NGAY</span>
          </Button>
        </form>
      </Form>
    </div>
  )
}


export default ContactForm