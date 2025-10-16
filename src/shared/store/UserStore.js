import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      // Estado
      tipo: null, // Tipo/role do usuário
      info: null, // Objeto completo com dados do usuário

      // Ações
      setMe: (tipo, info) => set({ tipo, info }),
      logout: () => set({ tipo: null, info: null }),
    }),
    {
      // Configuração de persistência
      name: 'user-storage', // Chave no localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;