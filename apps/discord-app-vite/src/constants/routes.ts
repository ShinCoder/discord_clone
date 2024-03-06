export const publicRoutes = {
  login: '/login',
  register: '/register',
  verify: '/verify',
  forgotPassword: '',
  terms: '/terms',
  privacy: '/privacy'
};

export const protectedRoutes = {
  app: '/app',
  channels: (type: 'base' | 'pattern' | 'absolute' = 'base', id?: string) => {
    switch (type) {
      case 'base':
        return '/channels';
      case 'pattern':
        return '/channels/:id';
      case 'absolute':
        return `/channels/${id}`;
    }
  },
  myChannels: '/channels/@me',
  discoverServers: '/channels/guild-discovery'
};
