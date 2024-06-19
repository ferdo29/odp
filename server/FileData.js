const moment = require("moment/moment");
const fs = require("node:fs");
const fsPromises = require("node:fs/promises");

class FileData {
    lastDate = new Date()
    constructor(path = '.') {
        this.path = path
    }

    /**
     * Запись в файл
     * @param value {object | Buffer}
     */
    create(value) {

        let data = ''

        switch (true) {
            case Buffer.isBuffer(value):
                data = value.toString();
                break
            case typeof value === 'object':
                data = JSON.stringify(value)
                break
            case typeof value === 'string':
            case typeof value === 'number':
            case typeof value === 'boolean':
                data = String(value)
                break
        }

        const nameFile = moment().format("YYYY-MM-DDTHH:mm")
        const isCreate = moment().minute() > moment(this.lastDate).minute()
        this.setData({nameFile, isCreate, data: data})
            .finally(() => {
                this.lastDate = new Date()
            })
    }

    /**
     * Запись в файл
     * @param value {{nameFile: string, isCreate: boolean, data: string}}
     * @return {Promise<void>}
     */
    async setData(value) {

        const name = `${this.path}/${value.nameFile}`

        if (!fs.existsSync(name) || value.isCreate) {
            await fsPromises.writeFile(name, '', 'utf-8')
        }
        await fsPromises.appendFile(name, `${value.data}\n`, 'utf-8')
    }

}

module.exports = FileData
