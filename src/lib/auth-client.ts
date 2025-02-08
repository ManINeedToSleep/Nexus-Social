// Temporary mock implementation - will be replaced with actual auth later

export async function signIn(email: string, password: string): Promise<void> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Basic validation
  if (!email || !password) {
    throw new Error('Please provide both email and password');
  }

  // TODO: Implement actual authentication
  console.log('Sign in:', { email });
}

export async function signUp(
  name: string,
  email: string,
  password: string
): Promise<void> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Basic validation
  if (!name || !email || !password) {
    throw new Error('Please provide all required fields');
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Please provide a valid email address');
  }

  // TODO: Implement actual registration
  console.log('Sign up:', { name, email });
}

export async function signOut(): Promise<void> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // TODO: Implement actual sign out
  console.log('Sign out');
}

export async function getCurrentUser() {
  // TODO: Implement actual user fetching
  return null;
} 