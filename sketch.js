/// <reference path="./p5.global-mode.d.ts" />

let inputElement;
let userImage;

function setup() {
  inputElement = createFileInput(handleFile);
  inputElement.position(400, 20);
  createCanvas(300, 300)
}

function draw() {
  background(230, 180, 180);

  if (userImage != null) {
    image(userImage, 0, 0, width, height);
  }
}

function handleFile(file) {
  print(file);

  if (file.type === 'image') {
    userImage = createImg(file.data, '');
    userImage.hide();
  } else {
    userImage = null;
  }
}