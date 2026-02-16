/**
 * CLIENT-SAFE LOGIC
 * Open Access Version: Everyone is an Agent.
 */
export function checkIsAgent(user: any, has?: any): boolean {
  // If the user is logged in, they have full access.
  return !!user;
}
