import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "685533d6398e4d3364d846fc", 
  requiresAuth: true // Ensure authentication is required for all operations
});
