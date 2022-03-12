export declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES_MENU: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2', class: '' },
    { path: '/import-orders', title: 'Importar Pedidos',  icon:'ni-cloud-upload-96', class: '' },
    { path: '/msg-default', title: 'Mensagem Padrão',  icon:'ni-single-copy-04', class: '' },
    { path: '/send-message', title: 'Enviar Mensagem',  icon:'ni-send', class: '' }
];

export const ROUTES_MENU_SECUNDARY: RouteInfo[] = [
    { path: '/user-profile', title: 'Meu Perfil',  icon:'ni-single-02', class: '' }
];