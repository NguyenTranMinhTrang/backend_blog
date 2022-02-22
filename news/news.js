const fs = require('fs');

class News {
    constructor(filename = 'news.json') {
        this.path = `./data/${filename}`;

        try {
            fs.readdirSync('data');
        } catch (error) {
            fs.mkdirSync('data');
        }

        try {
            fs.accessSync(this.path);
        } catch (error) {
            fs.writeFileSync(this.path, '[]');
        }
    }

    createId() {
        return new Date().getTime().toString();
    }

    async create(data) {
        const totalData = await this.getAll();
        const id = this.createId();
        totalData.push({ ...data, id });
        await fs.promises.writeFile(this.path, JSON.stringify(totalData, null, 2));
    }

    async getAll() {
        return JSON.parse(await fs.promises.readFile(this.path));
    }

    async getSingleId(id) {
        const data = await this.getAll();
        return data.find(news => news.id === id)
    }

    async getCategory(category) {
        const data = await this.getAll();
        return data.filter(news => news.category === category);
    }
}

module.exports = News;