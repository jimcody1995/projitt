'use client'
import axios from "axios"
import { createContext, useContext, useState, ReactNode, useEffect } from "react"

type Session = {
    token: string | null
    user?: any
}

type SessionContextType = {
    session: Session
    setSession: (session: Session) => void
    clearSession: () => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSessionState] = useState<Session>({ token: null })
    useEffect(() => {
        const stored = localStorage.getItem("session")
        if (stored) {
            setSessionState({ token: stored })
            axios.defaults.headers.common["Authorization"] = `Bearer ${stored}`
        }
    }, [])
    const setSession = (session: Session) => {
        setSessionState(session)
        localStorage.setItem("session", JSON.stringify(session))
    }

    const clearSession = () => {
        setSessionState({ token: null })
        localStorage.removeItem("session")
    }

    return (
        <SessionContext.Provider value={{ session, setSession, clearSession }}>
            {children}
        </SessionContext.Provider>
    )
}

export const useSession = () => {
    const context = useContext(SessionContext)
    if (!context) throw new Error("useSession must be used within SessionProvider")
    return context
}
