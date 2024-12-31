// creates app object with links to renderer and app important params
function createApp(params) {
    // init root node
    const root = document.querySelector(params.root);

    if (!root) {
        throw new Error('Root node is not exist!');
    }

    // init canvas and context (renderer)
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
        throw new Error('Context is not exist!');
    }

    // set canvas sizes
    const width = params.width || 500;
    const height = params.height || 750;

    canvas.width = width;
    canvas.height = height;

    const isAnimated = params.loop || false;

    // inject app canvas to app root
    root.appendChild(canvas);

    // return app instance
    return {
        renderer: context,
        screen: canvas,
        bounds: {
            leftTop: { x: 0, y: 0 },
            rightTop: { x: width, y: 0 },
            rightBottom: { x: width, y: height },
            leftBottom: { x: 0, y: height },
        },

        loop: isAnimated,
        
        children: [],

        execute: function (code) {
            if (isAnimated) {
                let loopFn = () => {
                    requestAnimationFrame(loopFn);
                    code(this);
                };

                requestAnimationFrame(loopFn);
            } else {
                code(this);
            }
        },

        appendChild: function(scenesObject) {
            this.children.push(scenesObject);
            scenesObject.appendTo(this);
        },

        render: function() {
            this.children.forEach(object => {
                object.render();
            });
        },
    }
}


// init whole app
let app = createApp({
    root: '#app-root',
    width: 330,
    height: 430,
    loop: true,
});

let firework_1 = new Firework({
    launchPoint: { x: app.screen.width / 2, y: app.screen.height },
    blastPoint: { x: app.screen.width / 2, y: (app.screen.height / 2) - 100 },
    blastPower: 300,
    colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
});

let firework_2 = new Firework({
    launchPoint: { x: app.screen.width / 2, y: app.screen.height + 80 },
    blastPoint: { x: app.screen.width / 2 + 100, y: (app.screen.height / 2) - 50 },
    blastPower: 70,
    colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
});

let firework_3 = new Firework({
    launchPoint: { x: app.screen.width / 2, y: app.screen.height + 100 },
    blastPoint: { x: app.screen.width / 2 - 100, y: (app.screen.height / 2) - 50 },
    blastPower: 100,
    colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
});

let firework_4 = new Firework({
    launchPoint: { x: app.screen.width / 2, y: app.screen.height },
    blastPoint: { x: app.screen.width / 2, y: (app.screen.height / 2) - 100 },
    blastPower: 1000,
    blastRadius: 100,
    colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
});

app.appendChild(firework_1);
app.appendChild(firework_2);
app.appendChild(firework_3);
app.appendChild(firework_4);

// add some code
app.execute(app => {
    // fill with color
    const color = '#0b1026';
    app.renderer.fillStyle = color;
    app.renderer.fillRect(
        app.bounds.leftTop.x,
        app.bounds.leftTop.y,
        app.bounds.rightBottom.x,
        app.bounds.rightBottom.y
    );
    
    app.render();

    firework_1.launch();
    firework_2.launch(100);
    firework_3.launch(200);
    firework_4.launch(2000);
});