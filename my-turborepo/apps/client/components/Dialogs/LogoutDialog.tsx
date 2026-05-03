"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { logoutUser } from "@/services/user.service";
import { useRouter } from "next/navigation";

export default function LogoutDialog() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { mutate: logout, isPending } = useMutation({
        mutationFn: logoutUser,
        onSuccess: async () => {
            // Clear cache and redirect
             queryClient.clear();
            router.push("/");
        },
       
    });

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="cursor-pointer" variant="destructive">
                    Logout
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="rounded-lg p-6">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg cursor-pointer font-semibold">
                        Logout?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-muted-foreground">
                        You will be signed out of your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="gap-2">
                    <AlertDialogCancel className="rounded-md cursor-pointer" disabled={isPending}>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={() => logout()}
                        disabled={isPending}
                        className="bg-red-600 cursor-pointer hover:bg-red-700 text-white rounded-md flex items-center gap-2"
                    >
                        {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                        Logout
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}