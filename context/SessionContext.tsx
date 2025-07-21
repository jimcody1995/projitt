'use client'
import axios from "axios"
import { useRouter, usePathname } from "next/navigation"
import { createContext, useContext, useState, ReactNode, useEffect, useLayoutEffect } from "react"

type Session = {
    token: string | null
    authenticated: boolean
}

type SessionContextType = {
    session: Session
    setSession: (session: Session) => void
    clearSession: () => void
    loading: boolean
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSessionState] = useState<Session>({ token: null, authenticated: false })
    const [loading, setLoading] = useState(true)
    const router = useRouter();
    const pathname = usePathname();
    const publicRoutes = [
        '/signup',
        '/reset-password',
        '/set-password',
        '/change-password',
        '/company-domain',
        '/company-profile',
        '/confirm-email',
        '/verify-email'
    ]
    useLayoutEffect(() => {
        setLoading(true)
        const stored = localStorage.getItem("session")
        const isPublicRoute = publicRoutes.includes(pathname)
        if (stored) {
            setSessionState({ token: stored, authenticated: true })
            axios.defaults.headers.common["Authorization"] = `Bearer ${stored}`
            setTimeout(() => {
                setLoading(false)
            }, 1000)
            if (isPublicRoute || pathname === "/signin") {
                router.replace('/');
            }

        }
        else {
            setSessionState({ token: null, authenticated: false })
            setTimeout(() => {
                setLoading(false)
            }, 1000)
            if (!isPublicRoute && pathname !== "/signin") {
                router.replace('/signin');
            }
        }
    }, [])
    const setSession = (session: Session) => {
        setSessionState({ ...session })
        localStorage.setItem("session", JSON.stringify(session.token))
    }

    const clearSession = () => {
        setSessionState({ token: null, authenticated: false })
        localStorage.removeItem("session")
    }

    return (
        <SessionContext.Provider value={{ session, setSession, clearSession, loading }}>
            {children}
        </SessionContext.Provider>
    )
}

export const useSession = () => {
    const context = useContext(SessionContext)
    if (!context) throw new Error("useSession must be used within SessionProvider")
    return context
}
