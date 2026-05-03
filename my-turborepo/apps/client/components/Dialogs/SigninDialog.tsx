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
import { signinSchema, SigninData } from '@/app/utils/validation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginUser } from '@/services/user.service'
import { Loader2 } from 'lucide-react'
import {  useRouter } from 'next/navigation'

export default function SigninDialog({ open, setOpen, redirectUrl = "/" }: any) {
    const router = useRouter()
    const queryClient = useQueryClient()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SigninData>({
        resolver: zodResolver(signinSchema),
    })

    const { mutate, isPending, error } = useMutation({
        mutationFn: loginUser,
        onSuccess: async () => {
            // Refetch the user query to get updated user data
            await queryClient.invalidateQueries({ queryKey: ["me"] })
            reset()
            setOpen(false)
            router.push(redirectUrl)
        },
    })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md rounded-lg border bg-white dark:bg-gray-950 p-6">

                {/* HEADER */}
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Welcome Back
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
                        Sign in to your account
                    </DialogDescription>
                </DialogHeader>

                {/* BODY */}
                <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-4 mt-4">

                    <div>
                        <input
                            {...register('email')}
                            placeholder="Email"
                            className="w-full rounded-md border px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        />
                        <p className="text-xs text-red-500 mt-1">{errors.email?.message}</p>
                    </div>

                    <div>
                        <input
                            type="password"
                            {...register('password')}
                            placeholder="Password"
                            className="w-full rounded-md border px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        />
                        <p className="text-xs text-red-500 mt-1">{errors.password?.message}</p>
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">
                            {(error as Error).message || 'Login failed'}
                        </p>
                    )}

                    {/* FOOTER */}
                    <DialogFooter>
                        <button
                            type="submit"
                            disabled={isPending}
                            className={` ${isPending && "cursor-not-allowed"} w-full cursor-pointer rounded-md bg-black text-white py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 `}
                        >
                            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                            Sign In
                        </button>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    )
}