const {createVuePlugin} = require('vite-plugin-vue2')
const path = require('path');

// https://vitejs.dev/config/
module.exports = {
    plugins: [createVuePlugin(/*options*/)],
    resolve:
        {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
}
