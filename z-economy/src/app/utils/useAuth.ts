export function useAuth() {
  const token = localStorage.getItem('sb-vglfdkapzwnkxsdehqsv-auth-token');
  return token !== null;
}
