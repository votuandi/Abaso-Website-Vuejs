const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

let generateString = (_length) => {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < _length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

let getFilenameExtension = (_filename) => {
    let splitedName = _filename.split('.')
    return splitedName.length < 2 ? null : splitedName[splitedName.length - 1]
}

module.exports = {
    generateString: generateString,
    getFilenameExtension: getFilenameExtension
}