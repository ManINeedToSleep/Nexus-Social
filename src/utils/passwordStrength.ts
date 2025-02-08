interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

export function getPasswordStrength(password: string): PasswordStrength {
  // Calculate score based on various criteria
  let score = 0;
  
  // Length check
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  
  // Character variety checks
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  // Normalize score to 0-4 range
  score = Math.min(4, Math.floor(score / 1.5));
  
  // Get corresponding label and color
  const strengthMap: { [key: number]: { label: string; color: string } } = {
    0: { label: 'Very Weak', color: '#ef4444' },    // Red
    1: { label: 'Weak', color: '#f97316' },         // Orange
    2: { label: 'Fair', color: '#eab308' },         // Yellow
    3: { label: 'Good', color: '#22c55e' },         // Green
    4: { label: 'Strong', color: '#15803d' },       // Dark Green
  };

  return {
    score,
    label: strengthMap[score].label,
    color: strengthMap[score].color,
  };
} 