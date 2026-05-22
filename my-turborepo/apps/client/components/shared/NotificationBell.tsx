"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Bell } from "lucide-react";
import { useSocket } from "@/app/socket-provider";
import { useEffect, useState } from "react";
import { getNotifications, markAllAsRead, markAsRead } from "@/services/notification.service";


import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";





export default function NotificationBell() {
    const socket = useSocket();
    const queryClient = useQueryClient();
    const [notifications, setnotifications] = useState<any[]>([])

    const { data } = useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications
    });

    useEffect(() => {
        if (data) {
            const ArrayData = Array.isArray(data) ? data : data.data || data.notifications || [];
            setnotifications(ArrayData)
        }

    }, [data])

    useEffect(() => {
        if (!socket) return;
        socket.on("order_created", (notification: any) => {
            setnotifications((prev) => [
                notification,
                ...prev
            ])


        });
        return () => {
            socket.off("order_created");
        }

    }, [socket]);



    //read
    const unreadCount = Array.isArray(notifications) ? notifications.filter((n) => !n.isRead).length : 0;

    const markReadMutation = useMutation({
        mutationFn: markAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notifications"]
            })
        }
    });
    const markAllReadMutation = useMutation({
        mutationFn: markAllAsRead,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notifications"]
            })
        }
    })




    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="relative">
                        <Bell className="w-4 h-4 border-none cursor-pointer hover:border-none" />
                        {unreadCount > 0 && (
                            <span className="
           absolute -top-3 -right-3 bg-amber-400 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium
            ">
                                {unreadCount}
                            </span>
                        )}

                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-87.5 p-2" align="end">

                    <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold ">
                            Notifications
                        </p>
                        <button
                            onClick={() =>
                                markAllReadMutation.mutate()
                            }
                            className="text-sm text-blue-500 cursor-pointer"
                        >
                            Mark all as read
                        </button>



                    </div>

                    {/* //content  */}

                    <div className="max-h-100 overflow-y-auto  space-y-2">
                        {notifications.length === 0 && (
                            <p className="text-xs text-gray-500">
                                No notifications
                            </p>
                        )}

                        {notifications.map((noti) => (
                            <div key={noti.id}
                                onClick={() => markReadMutation.mutate(noti.id)}
                                className={`p-3 rounded-lg cursor-pointer transition ${noti.isRead
                                    ? "bg-gray-100"
                                    : "bg-blue-50 font-medium"
                                    }
              `}
                            >
                                <p>{noti.title}</p>

                                <p className="text-sm text-gray-500">
                                    {noti.message}
                                </p>

                            </div>
                        ))}

                    </div>


                </DropdownMenuContent>

            </DropdownMenu>



        </div>
    )
}
