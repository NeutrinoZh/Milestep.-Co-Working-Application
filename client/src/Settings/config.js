const config = {
    urls: {
        home: '/',
        profile: '/profile/',
        signin: '/auth/signin/',
        signup: '/auth/signup/',
        reset: '/auth/reset/',
        reset_link: '/auth/reset-link/',
        add_event: '/add-event/',
        event_detail: '/event-detail/',
        author_detail: '/author-detail/'
    },
    api: {
        signin: '/auth/signin/',
        signup: '/auth/signup/',
        reset: '/auth/reset/',
        reset_link: '/auth/reset-link/',
        new_password: '/auth/new-password/',
        like: '/like/',
        comment: '/comments/',
        change_name: '/change-name/',
        change_email: '/change-email/',
        change_avatar: '/change-avatar/',
        add_event: '/add-event/',
        get_events: '/get-events/',
        get_event: '/get-event/',
        join_event: '/join-event/',
        delete_event: '/delete-event/',
        get_user: '/get-user/'
    },
    server: 'http://localhost:3033'
}

export default config