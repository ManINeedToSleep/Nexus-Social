'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { signIn } from '@/lib/auth-client'

interface SignInFormProps {
  formData: {
    email: string;
    password: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function SignInForm({ formData, onChange }: SignInFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Use formData instead of local state
  const { email, password } = formData

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      await signIn(email, password)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid credentials')
    } finally {
      setLoading(false)
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
          disabled={loading}
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
          disabled={loading}
        />
      </div>

      <button 
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center py-2.5"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <LoadingSpinner />
            <span>Signing in...</span>
          </div>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  )
} 