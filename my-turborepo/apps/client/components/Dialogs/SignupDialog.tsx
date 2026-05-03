'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupData, signupSchema } from '@/app/utils/validation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from '@/services/user.service'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SignupDialog({ open, setOpen, redirectUrl = "/" }: any) {
    const router = useRouter()
const queryClient = useQueryClient()    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SignupData>({
        resolver: zodResolver(signupSchema),
    })

    const { mutate, isPending, error } = useMutation({
        mutationFn: createUser,
        onSuccess: async () => {
            // Refetch the user query to get updated user data
            await queryClient.invalidateQueries({ queryKey: ["me"] })
            reset()
            setOpen(false)
            router.push(redirectUrl)
        },
    })

    const onSubmit = (data: SignupData) => {
        mutate(data)
        console.log("data", data)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md rounded-lg border bg-white dark:bg-gray-950 p-6">

                {/* HEADER */}
                <DialogHeader className="space-y-1">
                    <DialogTitle className="text-xl font-semibold">
                        Create Account
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
                        Enter your details to create your account
                    </DialogDescription>
                </DialogHeader>

                {/* BODY */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">

                    {/* First + Last Name */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <input
                                {...register('firstName')}
                                placeholder="First name"
                                className="w-full rounded-md border px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            />
                            <p className="text-xs text-red-500 mt-1">{errors.firstName?.message}</p>
                        </div>

                        <div>
                            <input
                                {...register('lastName')}
                                placeholder="Last name"
                                className="w-full rounded-md border px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            />
                            <p className="text-xs text-red-500 mt-1">{errors.lastName?.message}</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            {...register('email')}
                            placeholder="Email"
                            className="w-full rounded-md border px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        />
                        <p className="text-xs text-red-500 mt-1">{errors.email?.message}</p>
                    </div>

                    {/* Password */}
                    <div>
                        <input
                            type="password"
                            {...register('password')}
                            placeholder="Password"
                            className="w-full rounded-md border px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        />
                        <p className="text-xs text-red-500 mt-1">{errors.password?.message}</p>
                    </div>

                    {/* API ERROR */}
                    {error && (
                        <p className="text-sm text-red-500">
                            {(error as Error).message || 'Something went wrong'}
                        </p>
                    )}

                    {/* FOOTER */}
                    <DialogFooter className="mt-4">
                        <button
                            type="submit"
                            disabled={isPending}
                            className={` ${isPending && "cursor-not-allowed"} w-full cursor-pointer rounded-md bg-black text-white py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 `}
                        >
                            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                            Create Account
                        </button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    )
}