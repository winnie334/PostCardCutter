/// <reference path="./p5.global-mode.d.ts" />

const POSTCARD_RATIO = 1788/1255

let inputElement;
let userImage;

let rects = [];

class cutoutRectangle {
  constructor(x, y, w, h) {
    this.pos = [x, y, w, h];
    this.dragging = false;
    this.offset = [0, 0];
  }

  draw() {
    if (this.dragging) {
      this.pos[0] = mouseX - this.offset[0];
      this.pos[1] = mouseY - this.offset[1];
    }

    fill(0, this.isMouseInside() ? 40 : 0, 0, 100)
    rect(this.pos[0], this.pos[1], this.pos[2], this.pos[3]);
  }

  isMouseInside() {
    return this.pos[0] < mouseX && mouseX < this.pos[0] + this.pos[2] && 
           this.pos[1] < mouseY && mouseY < this.pos[1] + this.pos[3];
  }

  pressed() {
    if (this.isMouseInside()) {
      this.dragging = true;
      this.offset = [mouseX - this.pos[0], mouseY - this.pos[1]]
    }
  }

  released() {
    this.dragging = false;
    this.offset = [0, 0];
  }

}

function setup() {
  inputElement = createFileInput(handleFile);
  inputElement.position(200, 20);
  createCanvas(400, 200);
  rects.push(new cutoutRectangle(10, 10, 30, 30));
  rects.push(new cutoutRectangle(100, 100, 90, 90));
}

function draw() {
  background(230, 180, 180);

  if (userImage != null) {
    fill(230, 200, 200);
    rect(0, 0, width, 100)
    image(userImage, 100, 200, userImage.width, userImage.height);
  }

  rects.forEach(rect => {rect.draw();})
}

function mousePressed() {
  rects.forEach(rect => {rect.pressed()})
}

function mouseReleased() {
  rects.forEach(rect => {rect.released()})
}

function handleFile(file) {
  if (file.type === 'image') {
    userImage = createImg(file.data, '');
    userImage.hide();
    resizeCanvas(userImage.width+200, userImage.height+300);
    resizeCanvas(userImage.width+200, userImage.height+300);
    inputElement.hide();
  } else {
    userImage = null;
  }
}