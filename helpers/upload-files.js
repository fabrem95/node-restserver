const path = require('path')
const { v4: uuidv4 } = require('uuid');
uuidv4();

const uploadFileAndReturnName = (file, validateFileExtention = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise((res, rej) => {

        //Valdidar extension de archivos
        const splitedFile = file.name.split('.')
        const fileExtention = splitedFile[splitedFile.length - 1]

        if (!validateFileExtention.includes(fileExtention)) {
            return rej(`La extensión ${fileExtention} no es válida. Los tipos de extensión validos son ${validateFileExtention}`)
        }

        //Renombrar archivo
        const ourFileName = uuidv4() + '.' + fileExtention 
        const uploadPath = path.join(__dirname, '../uploads/', folder, ourFileName);

        //Subir Arvhivo
        file.mv(uploadPath, (err) => {
            if (err) {
                return rej(err);
            }

            res(ourFileName)
        });
    })
}

module.exports = {
    uploadFileAndReturnName
}