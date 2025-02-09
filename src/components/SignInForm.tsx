'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { signIn, signInWithGoogleProvider } from '@/lib/auth-client'

interface SignInFormProps {
  formData: {
    email: string;
    password: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function SignInForm({ formData, onChange }: SignInFormProps) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [emailLoading, setEmailLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  // Use formData instead of local state
  const { email, password } = formData

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setEmailLoading(true)
    
    try {
      await signIn(email, password)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setEmailLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setGoogleLoading(true)
    
    try {
      await signInWithGoogleProvider()
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign in failed')
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-md bg-error/10 border border-error text-error text-sm"
        >
          {error}
        </motion.div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1.5">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onChange('email', e.target.value)}
          className="input w-full"
          placeholder="your@email.com"
          required
          disabled={emailLoading || googleLoading}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1.5">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => onChange('password', e.target.value)}
          className="input w-full"
          placeholder="••••••••"
          required
          disabled={emailLoading || googleLoading}
        />
      </div>

      <button 
        type="submit"
        className="btn-primary w-full"
        disabled={emailLoading || googleLoading}
      >
        {emailLoading ? (
          <div className="flex items-center justify-center gap-2">
            <LoadingSpinner />
            <span>Signing in...</span>
          </div>
        ) : (
          'Sign In'
        )}
      </button>

      <button 
        type="button"
        onClick={handleGoogleSignIn}
        disabled={emailLoading || googleLoading}
        className="btn-secondary w-full justify-center py-2.5"
      >
        {googleLoading ? (
          <div className="flex items-center gap-2">
            <LoadingSpinner />
            <span>Connecting to Google...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 justify-center">
            <GoogleIcon />
            <span>Continue with Google</span>
          </div>
        )}
      </button>
    </form>
  )
}

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
) 