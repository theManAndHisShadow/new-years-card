// creates app object with links to renderer and app important params
function createApp(params) {
    // init root node
    const root = document.querySelector(params.root);

    if(!root) {
        throw new Error('Root node is not exist!');
    }

    // init canvas and context (renderer)
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if(!context) {
        throw new Error('Context is not exist!');
    }

    // set canvas sizes
    const width = params.width || 500;
    const height = params.height || 750;

    canvas.width = width;
    canvas.height = height;

    // inject app canvas to app root
    root.appendChild(canvas);

    // return app instance
    return {
        renderer: context,
        body: canvas,
        bounds: {
            leftTop: {x: 0, y: 0},
            rightTop: {x: width, y: 0},
            rightBottom: {x: width, y: height},
            leftBottom: {x: 0, y: height},
        },

        execute: function(code){
            code(this);
        },
    }
}


// init whole app
let app = createApp({
    root: '#app-root',
    width: 330,
    height: 430,
});

// add some code
app.execute(app => {

});