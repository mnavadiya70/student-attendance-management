function getItem(name) {
    return localStorage.getItem(name)
}

function setItem(name, value) {
    return localStorage.setItem(name, value)
}

export {
    getItem,
    setItem
}