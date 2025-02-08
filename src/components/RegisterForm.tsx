'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { getPasswordStrength } from '@/utils/passwordStrength'
import { signIn, signUp } from '@/lib/auth-client'

interface RegisterFormProps {
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function RegisterForm({ formData, onChange }: RegisterFormProps) {
  const router = useRouter()
  const { name, email, password, confirmPassword } = formData
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: '',
    color: ''
  })

  useEffect(() => {
    if (password) {
      setPasswordStrength(getPasswordStrength(password))
    }
  }, [password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (passwordStrength.score < 2) {
      setError('Please choose a stronger password')
      return
    }

    setLoading(true)
    
    try {
      await signUp(name, email, password)
      await signIn(email, password)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
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
        <label htmlFor="name" className="block text-sm font-medium mb-1.5">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => onChange('name', e.target.value)}
          className="input w-full"
          placeholder="Your name"
          required
          disabled={loading}
        />
      </div>

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
        {password && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-2"
          >
            <div className="flex justify-between items-center text-sm mb-1">
              <span style={{ color: passwordStrength.color }}>
                Password strength:
              </span>
              <span style={{ color: passwordStrength.color }}>
                {passwordStrength.label}
              </span>
            </div>
            <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full transition-all duration-300"
                style={{ 
                  backgroundColor: passwordStrength.color,
                  width: `${(passwordStrength.score / 4) * 100}%`
                }}
                initial={{ width: 0 }}
                animate={{ width: `${(passwordStrength.score / 4) * 100}%` }}
              />
            </div>
          </motion.div>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1.5">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => onChange('confirmPassword', e.target.value)}
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
            <span>Creating Account...</span>
          </div>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  )
} 