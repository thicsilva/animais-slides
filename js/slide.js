export default class Slide {
    constructor(slide, wrapper) {
        this.slide = document.querySelector(slide);
        this.wrapper = document.querySelector(wrapper);
        this.dist = {
            finalPosition: 0,
            startX: 0,
            movement: 0
        };
    }

    onStart(event) {
        let movetype;
        if (event.type === 'mousedown') {
            event.preventDefault();
            this.dist.startX = event.clientX;
            movetype = 'mousemove';
        } else {
            this.dist.startX = event.changedTouches[0].clientX;
            movetype = 'touchmove';
        }
        this.wrapper.addEventListener(movetype, this.onMove);
    }

    onMove(event) {
        const pointer = event.type === 'mousemove' ? event.clientX : event.changedTouches[0].clientX;
        const finalPosition = this.updatePosition(pointer);
        this.moveSlide(finalPosition);
    }

    onEnd(event) {
        const movetype = event.type === 'mouseup' ? 'mousemove' : 'touchmove';
        this.wrapper.removeEventListener(movetype, this.onMove);
        this.dist.finalPosition = this.dist.movePosition;
    }

    updatePosition(clientX) {
        this.dist.movement = (this.dist.startX - clientX) * 1.6;
        return this.dist.finalPosition - this.dist.movement;
    }

    addSlideEvents() {
        this.wrapper.addEventListener('mousedown', this.onStart);
        this.wrapper.addEventListener('touchstart', this.onStart);
        this.wrapper.addEventListener('mouseup', this.onEnd);
        this.wrapper.addEventListener('touchend', this.onEnd);
    }

    moveSlide(distX) {
        this.dist.movePosition = distX;
        this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
    }

    bindEvents() {
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
    }

    init() {
        if (this.slide && this.wrapper) {
            this.bindEvents();
            this.addSlideEvents();
        }
        return this;
    }
}
