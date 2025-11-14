import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// [ALTERAÇÃO] Importa o store do Zustand em vez do Context
import useAuthStore from '../store/AuthStore';

/**
 * Este componente "porteiro" protege rotas de Admin.
 * Ele é feito para ser usado *DENTRO* de um <PrivateRoute>,
 * então já podemos assumir que o usuário está logado (tem token).
*
 * Ele apenas verifica se o usuário logado tem o 'tipo' ADMIN.
 */
const AdminRoute = () => {
  // [ALTERAÇÃO] Pega o usuário do store do Zustand
  const user = useAuthStore((state) => state.user);

  // Sua linha de teste. Agora o 'user' abaixo será o do Zustand.
  const isAdmin = true; // user && user.tipo === 'ADMIN';

  // Se for admin, mostre a página de admin (o <Outlet />)
  if (isAdmin) {
    return <Outlet />; // Renderiza o <AdminUploadScreen />
  }

  // Se NÃO for admin, mande-o para a "home" dele.
  // (Não mandamos para /login, pois ele JÁ está logado)
  // [ALTERAÇÃO] Esta lógica agora usa o 'user' do Zustand
  const homePath = user?.tipo === 'ONG' ? '/ong-home' : '/adotante-home';
  
  // O 'replace' impede que ele use o botão "voltar" do navegador
  // Se o user for null por algum motivo, redireciona para a home pública
  return <Navigate to={homePath || '/'} replace />;
};

export default AdminRoute;