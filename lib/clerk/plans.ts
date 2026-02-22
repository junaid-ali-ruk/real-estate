/**
 * CLIENT-SAFE LOGIC
 * Open Access Version: Everyone is an Agent.
 */
export function checkIsAgent(user: unknown): boolean {
  // If the user is logged in, they have full access.
  return !!user;
}
