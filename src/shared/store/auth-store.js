import { create } from "zustand";

const useAuthStore = create(set => ({
  user: null, // As informações decodificadas do token
  token: null, // O token JWT completo
  setAuthData: (token, user) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
}))

export default useAuthStore;





TEM QUE FAZER ISSO AINDA