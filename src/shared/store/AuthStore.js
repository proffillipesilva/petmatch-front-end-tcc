import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      // Estado
      user: null,       // Dados do usuário (payload do token)
      token: null,      // Token JWT de autenticação
      fcmToken: null,   // Token para notificações push

      // Ações
      setAuthData: (token, user) => set({ token, user }),
      setFcmToken: (token) => set({ fcmToken: token }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      // Configuração de persistência
      name: 'auth-storage', // Chave no localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;