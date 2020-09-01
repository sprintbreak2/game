export class LocalStorageHelper {
    // Permite el almacenamiento en el LocalStorage.
    setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    // Obtiene el valor, por medio de un key, almacenado en el LocalStorage.
    getItem(key) {
        return JSON.parse(localStorage.getItem(key))
    }
}
