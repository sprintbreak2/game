import cookie from 'js-cookie';

// Set in cookie
export const setCookie = (key, value) => {
    if(window !== 'undefined') {
        cookie.set(key, value, {
            // 1 day
            expires: 1
        })
    }
}

// Remove from cookie
export const removeCookie = key => {
    if(window !== 'undefined') {
        cookie.remove(key, {
            // 1 day
            expires: 1
        })
    }
}

// Get from cookie like listen
export const getCookie = key => {
    if(window !== 'undefined') {
        return cookie.get(key);
    }
}

// Set in localStorage
export const setLocalStorage = (key, value) => {
    if(window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

// Remove from localStorage
export const removeLocalStorage = key => {
    if(window !== 'undefined') {
        localStorage.removeItem(key);
    }
}

// Auth user after login
export const authenticate = (response, next) => {
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
}

// Sign out
export const signOut = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
}

// Get user from localStorage
export const isAuth = () => {
    if(window !== 'undefined') {
        const cookieChecked = getCookie('token');
        if(cookieChecked) {
            if(localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
}

// Update user in localStorage
export const updateUser = (response, next) => {
    if(window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth= response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
}


