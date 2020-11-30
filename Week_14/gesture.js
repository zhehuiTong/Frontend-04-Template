let element = document.documentElement;

function dispatch(type, properties) {
    let event = new Event();
    for (let name in properties) {
        event[name] = properties[name];
    }
    element.dispatchEvent(event);
}

export class Dispatch {
    constructor(element) {
        this.element = element;
    }
    dispatch(type, properties) {
        let event = new Event();
        for (let name in properties) {
            event[name] = properties[name];
        }
        element.dispatchEvent(event);
    }
}

export class Listener {
    constructor(element, recognizer) {

        let contexts = new Map();

        let isListeningMouse = false;

        element.addEventListener("mousedown", event => {

            let context = Object.create(null);
            contexts.set("mouse" + (1 << event.button), context);

            recognizer.start(event)

            let mousemove = event => {
                let button = 1;

                while (button <= event.buttons) {
                    let key;
                    if (button === 2) {
                        key = 4;
                    } else if (button === 4) {
                        kry = 2;
                    } else {
                        key = button
                    }
                    let context = contexts.get("mouse" + button);
                    recognizer.move(event, context);
                    button = button << 1;
                }
            }

            let mouseup = event => {
                let context = contexts.get("mouse" + (1 << event.button));
                recognizer.end(event, context);
                contexts.delete("mouse" + (1 << event.button));

                if (event.buttons === 0) {
                    document.removeEventListener("mousemove", mousemove);
                    document.removeEventListener("mouseup", mouseup);
                    isListeningMouse = false;
                }

            }

            if (!isListeningMouse) {
                document.addEventListener("mousemove", mousemove);
                document.addEventListener("mouseup", mouseup);
                isListeningMouse = true;
            }

        })

        element.addEventListener("touchstart", event => {
            for (let touch of event.changedTouches) {
                let context = Object.create(null);
                contexts.set(touch.identifier, context);
                recognizer.start(touch, context);
            }
        })

        element.addEventListener("touchmove", event => {
            for (let touch of event.changedTouches) {
                let context = contexts.get(touch.identifier);
                recognizer.move(touch, context)
            }
        })

        element.addEventListener("touchend", event => {
            for (let touch of event.changedTouches) {
                let context = contexts.get(touch.identifier);
                recognizer.end(touch, context)
                contexts.delete(touch.identifier)
            }
        })

        element.addEventListener("touchcancel", event => {
            for (let touch of event.changedTouches) {
                let context = contexts.get(touch.identifier);
                recognizer.cancle(touch, context);
                contexts.delete(touch.identifier)
            }
        })
    }
}

export class Recognizer {
    constructor(dispatch) {
        this.dispatch = dispatch;
    }

    start(point, content) {

        content.startX = point.clientX, content.startY = point.clientY;

        content.points = {
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        }

        content.isPan = false, content.isTap = true, content.isPress = false
        handler = setTimeout(() => {
            content.isTap = false;
            content.isPan = false;
            content.isPress = true;
            content.handler = null;
            this.dispatch("press", {})
        }, 500);
    }

    move(point, content) {
        let dx = point.clientX - content.startX, dy = point.clientY - content.startY;

        // 判断是否移动10px
        if (!content.isPan && dx ** 2 + dy ** 2 > 100) {
            content.isTap = false;
            content.isPan = true;
            content.isPress = false;
            content.isVertical = Math.abs(dx) < Math.abs(dy);
            this.dispatch("panstart", {
                startX: content.startX,
                startY: content.startY,
                clientX: content.clientX,
                clientY: content.clientY,
                isVertical: content.isVertical
            });
            clearTimeout(content.handler);
        }

        if (content.isPan) {
            this.dispatch("pan", {
                startX: content.startX,
                startY: content.startY,
                clientX: content.clientX,
                clientY: content.clientY,
                isVertical: content.isVertical
            });
        }

        content.points = content.points.filter(point => Date.now() - point.t < 500)

        content.points.push({
            t: Date.now(),
            x: point.clientX,
            y: point.clientY
        })
    }

    end(point, content) {

        if (content.isTap) {
            this.dispatch("tap", {});
            clearTimeout(handler);
        }
        if (content.isPress) {
            this.dispatch("pressend", {})
        }

        content.points = content.points.filter(point => Date.now() - point.t < 500)

        let d, v;
        if (!content.points.length) {
            v = 0;
        } else {
            d = Math.sqrt((point.clientX - content.points[0].x) ** 2 +
                (point.clientY - content.points[0].y) ** 2);
            v = d / (Date.now() - content.points[0].t)
        }

        if (v > 1.5) {
            content.isFlick = true;
            this.dispatch("flick", {
                startX: content.startX,
                startY: content.startY,
                clientX: content.clientX,
                clientY: content.clientY,
                isVertical: content.isVertical,
                isFlick: content.isFlick,
                velocity: v
            });
        } else {
            content.isFlick = false;
        }

        if (content.isPan) {
            this.dispatch("panend", {
                startX: content.startX,
                startY: content.startY,
                clientX: content.clientX,
                clientY: content.clientY,
                isVertical: content.isVertical,
                isFlick: content.isFlick
            });

        }
    }

    cancle(point, content) {
        this.dispatch("cancle", {});
        clearTimeout(content.handler)
    }
}

export function enableGesture(element) {
    new Listener(element, new Recognizer(new Dispatch().dispatch))
}