"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);


const backendUrl = process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE_URL || "http://localhost:3015";

export function SocketProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((c) => c.startsWith("accessToken="))
            ?.split("=")[1];

        if (!token) return;

        const socketInstance = io(
            backendUrl,
            {
                auth: {
                    token,
                },
                withCredentials: true,
            },
        );

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export function useSocket(): Socket | null {
    return useContext(SocketContext);
}
