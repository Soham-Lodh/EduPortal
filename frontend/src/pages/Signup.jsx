// In your handleResetPassword function:
const handleResetPassword = async () => {
  if (!otp) return toast.error('OTP required');
  if (!newPassword) return toast.error('Password required');

  setIsLoading(true);
  try {
    const result = await resetPassword({ email, otp, newPassword });
    
    if (result.success) {
      toast.success(result.message || "Password reset successful");
      navigate("/login");
    } else {
      toast.error(result.error || "Failed to reset password");
    }
  } catch (err) {
    toast.error(err.message || "Failed to reset password");
  } finally {
    setIsLoading(false);
  }
};