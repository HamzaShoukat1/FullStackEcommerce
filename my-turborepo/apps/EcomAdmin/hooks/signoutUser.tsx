// import { useRouter } from "next/router"

// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { logoutUser } from "@/services/user.service";
// import { cookies } from "next/headers";

// export async function useLogout() {
//     const cookiesStroe = await cookies();
//     const authToken = cookiesStroe.get("accessToken")?.value;
//     const router = useRouter()
//     const queryClient = useQueryClient();
//     const { mutate: logout, isPending } = useMutation({
//         mutationFn: () => logoutUser(authToken ?? ""),
//         onSuccess: () => {
//             queryClient.clear();
//             router.push("/sign-in");
//         },
//         onError: (error) => {
//             console.error("Logout failed:", error);
//         }
//     });

//     const handleLogout = () => {
//         logout();
//     };


//     return { handleLogout, isPending }



// }