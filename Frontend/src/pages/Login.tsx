import { useState } from 'react'
import { Lock, Mail } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      alert('Login functionality would be implemented with backend integration.')
      setEmail('')
      setPassword('')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-block bg-primary-100 p-4 rounded-lg mb-4">
            <Lock className="text-primary-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-secondary-600">
            Sign in to your JKKNIU Research Society account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-secondary-900 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-secondary-400" size={20} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-secondary-900 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-secondary-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-secondary-400 hover:text-secondary-600"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-2 focus:ring-primary-600"
                defaultChecked
              />
              <span className="ml-2 text-sm text-secondary-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin mr-2">⏳</div>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-secondary-200">
          <p className="text-center text-secondary-600 text-sm mb-4">
            Don't have an account?{' '}
            <a href="/membership" className="text-primary-600 hover:text-primary-700 font-semibold">
              Create one
            </a>
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Demo Notice:</strong> This is a frontend prototype. Backend authentication will be implemented later.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login