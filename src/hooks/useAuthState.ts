import { useState } from 'react';

export function useAuthState() {
  const [ready] = useState(true);
  return { ready };
}
