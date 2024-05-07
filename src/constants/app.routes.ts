export const APP_ROUTES = {
    private: {
        hub: {
            path: '/hub'
        },
        profile: {
            path: '/profile'
        }
    },
    public: {
        home: {
            path: '/',
            restrict: false,
        },
        signin: {
            path: '/signin',
            restrict: true,
        },
        signup: {
            path: '/signup',
            restrict: true,
        }
    }
}