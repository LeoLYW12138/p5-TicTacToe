class bubble {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.brightness = 0;
        this.clicked = false;
        this.d = null;
    }

    click(x, y) {
        this.d = myp5.dist(x, y, this.x, this.y);
        if (this.d < this.r / 2){
            this.clicked = true;
        }
    }

    changeColor(bright) {
        this.brightness = bright;
    }

    show() {
        myp5.noStroke();
        if (this.clicked) {
            this.brightness = 10;
        } else {
            this.brightness = 20;
        }
        myp5.fill(255, 255, 255, this.brightness);
        myp5.ellipse(this.x, this.y, this.r, this.r);
    }

}
