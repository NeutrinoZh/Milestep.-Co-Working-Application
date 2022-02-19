const config = {
    port: process.env.PORT || 3033,
    urls: {
        server: `http://localhost:${process.env.PORT || 3033}`,
        reset_link: '/auth/reset-link/',
        signin: '/auth/signin/',
        signup: '/auth/signup/',
        reset: '/auth/reset/',
        new_password: '/auth/new-password/',
        change_name: '/change-name/',
        change_email: '/change-email/',
        change_avatar: '/change-avatar/',
        add_event: '/add-event/',
        get_events: '/get-events/',
        get_event: '/get-event/',
        join_event: '/join-event/',
        delete_event: '/delete-event/',
        like: '/like/',
        get_user: '/get-user/'
    },
    mongodb: "mongodb+srv://admin:123admin123@neutrinotest.vjth7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    salt: 'c01d192d',
    maxAgeToken: 360000, // One hour
    maxAgeResetLink: 180000 // Half hour
}

export default config