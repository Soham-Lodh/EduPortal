import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { GraduationCap, Mail, Loader2, Eye, EyeOff, Lock, Key } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const { sendResetOtp, resetPassword } = useAuth();
  const navigate = useNavigate();

  // Send OTP
  const handleSendOtp = async () => {
    if (!email) return toast.error('Email required');
    setIsLoading(true);
    try {
      const success = await sendResetOtp(email);
      if (success) {
        toast.success(`OTP sent to: ${email}`);
        setOtpSent(true);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password with OTP
  const handleResetPassword = async () => {
  if (!otp) return toast.error('OTP required');
  if (!newPassword) return toast.error('Password required');

  setIsLoading(true);
  try {
    // Make API call
    const res = await resetPassword({ email, otp, newPassword });
    // res should be { success: boolean, message?: string, error?: string }

    if (res.success) {
      toast.success(res.message || "Password reset successful");
      navigate("/login");
    } else {
      // Show backend error message
      toast.error(res.error || "OTP invalid or expired or Password reset failed");
    }
  } catch (err) {
    toast.error(err.message || "Failed to reset password");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-gradient">EduPortal</span>
          </Link>
        </div>

        <Card className="card-premium">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              {otpSent ? 'Reset Password' : 'Forgot Password'}
            </CardTitle>
            <CardDescription>
              {otpSent 
                ? 'Enter the OTP sent to your email and your new password'
                : 'Enter your registered email to receive an OTP'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                  disabled={otpSent}
                />
              </div>
            </div>

            {/* OTP Input (shown after OTP is sent) */}
            {otpSent && (
              <div className="space-y-2">
                <Label htmlFor="otp">OTP Code</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="pl-10 h-12"
                    required
                    maxLength={6}
                  />
                </div>
              </div>
            )}

            {/* New Password Input (shown after OTP is sent) */}
            {otpSent && (
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-10 pr-10 h-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters with uppercase, lowercase, number, and special character
                </p>
              </div>
            )}

            {/* Action Buttons */}
            {!otpSent ? (
              <Button 
                type="button" 
                className="btn-hero w-full h-12" 
                onClick={handleSendOtp} 
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </Button>
            ) : (
              <Button 
                type="button" 
                className="btn-hero w-full h-12" 
                onClick={handleResetPassword} 
                disabled={isLoading || !otp || !newPassword}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Resetting Password...
                  </>
                ) : (
                  'Reset Password'
                )}
              </Button>
            )}

            {/* Back to Login */}
            <div className="text-center pt-4">
              <Link to="/login" className="text-sm text-primary hover:underline">
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;