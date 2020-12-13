var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

    }

    async initPackage() {
        let answer = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "你的工程名字",
                default: this.appname
            }
        ])


        const pkgJson = {
            "name": answer.name,
            "version": "1.0.0",
            "description": "学习笔记",
            "main": "generators/app/index.js",
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1"
            },
            "keywords": [],
            "author": "",
            "license": "ISC",
            "dependencies": {
            },
            "devDependencies": {
            }
        };

        // Extend or create package.json file in destination path
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);

        this.npmInstall(["vue"], { 'save-dev': false });
        this.npmInstall([
            "webpack", 
            "vue-loader", 
            "vue-template-compiler",
            "css-loader",
            "vue-style-loader"
        ], { 'save-dev': true })
    }

    copyFiles() {
        this.fs.copyTpl(
            this.templatePath("app.vue"),
            this.destinationPath('src/App.vue')
        )

        this.fs.copyTpl(
            this.templatePath("webpack.config.js"),
            this.destinationPath('webpack.config.js')
        )

        this.fs.copyTpl(
            this.templatePath("index.html"),
            this.destinationPath('src/index.html'),
            {title: answer.name}
        )
    }
};