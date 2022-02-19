import config from "./Settings/config.js";

export function request(url, method, body, callbacks, user, server=config.server) {
    let formData = (body instanceof FormData)
    if (formData) 
        body.append('token', user.user.token)

    fetch(`${server}${url}`, {
        method: method,
        headers: formData ? undefined : {
            'Content-Type':  'application/json'
        },
        body: formData ? body : JSON.stringify({
            ...body,
            token: user.user.token
        })
    }).then((res) => {
        if (res.ok) {
            res.json().then((response) => {
                if (response.error) {
                    callbacks[0](response.error)
                } else {
                    callbacks[1](response)
                }
            })
        } else if (res.status == 401) {
            user.setUser({ name: '' })
        } else {
            callbacks[0](res.statusText);
        }
    })
}