var boxes = [];
var size = 100;
var isTime = false;
var cate;
var frame = 0;
var gen = {
    t: 0,
    r: 0,
    rate: 0
};
var best = 0;
var bestGen = {
    t: 0,
    r: 0
};
var population = 10;
var city = 0;
var generation = 0;
var genetics = [];

addEventListener('mousedown', () => {
    // if (event.keyCode == '32')
    createBox(world, event.clientX, event.clientY, 15, 30, false);
    // makeGen(size);
})

addEventListener('keydown', () => {
    if (event.keyCode == '32') {
        gen.rate = world.m_bodyCount;
        genetics.push(gen);
        if (world.m_bodyCount > best) {
            best = world.m_bodyCount;
            bestGen = gen;
        }
        console.log(gen);
        makeGen(size);
    }
    // createBox(world, event.clientX, event.clientY, 15, 30, false);
    // makeGen(size);
})



function makeGen(size) {
    for (var i = 0; i < boxes.length; i++) {
        world.DestroyBody(boxes[i]);
    }
    boxes = [];
    isTime = false;
    if (generation) {
        gen = {
            t: bestGen.t + (Math.random() - 0.5) / 2,
            r: bestGen.r + (Math.random() - 0.5) / 2,
            rate: 0
        };
    } else {
        gen = {
            t: (Math.random() - 0.5) * 6,
            r: (Math.random() - 0.5) * 6,
            rate: 0
        };
    }
    for (var i = 0; i < size; i++) {
        var pos = {
            x: Math.random() * window.innerWidth - 100,
            y: Math.random() * window.innerHeight / 2 + window.innerHeight / 2
        };
        boxes.push(createBox(world, pos.x, pos.y, 15, 30, false, goal.x, goal.y, gen.t, -2));
    }
    city++;
}

function update() {
    frame++;
    for (var i = 0; i < boxes.length; i++) {
        if (boxes[i])
            if (boxes[i].m_sleepTime)
                isTime = true;
        if (isTime) {
            if (boxes[i].m_position.y > window.innerHeight / 4 * 3) {
                world.DestroyBody(boxes[i]);
            }
        }
    }
    console.log(world.m_bodyCount);
    if (frame % 200 == 0) {
        gen.rate = world.m_bodyCount;
        genetics.push(gen);
        if (world.m_bodyCount > best) {
            best = world.m_bodyCount;
            bestGen = gen;
        }
        console.log(gen);
        makeGen(size);
    }
    if (city == population) {
        city = 0;
        mutate();
    }
}

function mutate() {
    generation++;
    console.log(genetics);
}

/*
if (boxes[i].m_rotation < -1.57 && boxes[i].m_rotation > -1.58 ||
                    boxes[i].m_rotation < -6.28 && boxes[i].m_rotation > -6.29 ||
                    boxes[i].m_rotation < -4.71 && boxes[i].m_rotation > -4.72 ||
                    boxes[i].m_rotation < -7.85 && boxes[i].m_rotation > -7.86 ||
                    boxes[i].m_rotation < -10.9 && boxes[i].m_rotation > -11.0 ||
                    boxes[i].m_position.y < window.innerHeight / 2) {


                if (boxes[i].m_rotation % Math.PI < -1.57 && boxes[i].m_rotation % Math.PI > -1.58) {
                    world.DestroyBody(boxes[i]);
                    up--;
                } else {
                    // console.log(boxes[i].m_rotation);
                    // console.log(boxes[i].m_position.y);
                    // console.log(up);
                    if (up < size)
                        if (boxes[i].m_position.y > window.innerHeight / 4 * 3) {
                            world.DestroyBody(boxes[i]);
                            up--;
                        }

                }

*/