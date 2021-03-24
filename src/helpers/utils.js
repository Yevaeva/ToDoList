export const trimString = (string, maxLenght=0) => {
    if (!maxLenght || !string || string.length<= maxLenght) {
        return string
    }
    return string.slice(0, maxLenght) + '...'
}