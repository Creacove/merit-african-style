import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { z } from 'zod';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    try {
      emailSchema.parse(email);
    } catch {
      toast.error('Please enter a valid email address');
      return false;
    }

    try {
      passwordSchema.parse(password);
    } catch {
      toast.error('Password must be at least 6 characters');
      return false;
    }

    if (!isLogin && !fullName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Welcome back!');
          navigate('/');
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('This email is already registered. Please sign in.');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Account created! You can now sign in.');
          setIsLogin(true);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--deep-chocolate))] flex flex-col">
      {/* Header */}
      <header className="p-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-[hsl(var(--warm-ivory))] hover:text-[hsl(var(--gold-accent))]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </header>

      {/* Auth Form */}
      <div className="flex-1 flex items-center justify-center px-6 pb-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src="/logo.png"
              alt="Merit African Style"
              className="h-16 mx-auto mb-6"
            />
            <h1 className="font-playfair text-3xl font-bold text-[hsl(var(--warm-ivory))] mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-[hsl(var(--muted-foreground))]">
              {isLogin
                ? 'Sign in to access your account'
                : 'Join us for exclusive tailoring experiences'}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-[hsl(var(--bg-section))] rounded-3xl p-8 border border-[hsl(var(--gold-accent))]/10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-[hsl(var(--warm-ivory))]">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="pl-10 bg-[hsl(var(--deep-chocolate))] border-[hsl(var(--gold-accent))]/20 text-[hsl(var(--warm-ivory))] placeholder:text-[hsl(var(--muted-foreground))]"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[hsl(var(--warm-ivory))]">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 bg-[hsl(var(--deep-chocolate))] border-[hsl(var(--gold-accent))]/20 text-[hsl(var(--warm-ivory))] placeholder:text-[hsl(var(--muted-foreground))]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[hsl(var(--warm-ivory))]">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-[hsl(var(--deep-chocolate))] border-[hsl(var(--gold-accent))]/20 text-[hsl(var(--warm-ivory))] placeholder:text-[hsl(var(--muted-foreground))]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--warm-ivory))] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[hsl(var(--gold-accent))] hover:bg-[hsl(var(--gold-accent))]/90 text-[hsl(var(--deep-chocolate))] font-semibold py-6 rounded-2xl"
              >
                {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            {/* Toggle */}
            <div className="mt-6 text-center">
              <p className="text-[hsl(var(--muted-foreground))]">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-[hsl(var(--gold-accent))] hover:underline font-medium"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
