let cv, ctx;
let fix;
let m1 = random(50, 100);
let m2 = random(50, 100);
let r1 = 200;
let r2 = 300;
let a1 = random(-Math.PI / 2, Math.PI / 2);
let a2 = random(-Math.PI / 2, Math.PI / 2);
let a1_v = 0;
let a2_v = 0;
const g = 1;
let res = false;
let atrito = 0.001;
const nFrames = 100;
let frames = {
  pos: [],
  cor: []
};

window.onload = function() {
  setup();
}

const setup = function() {
  cv = document.querySelector('canvas');
  ctx = cv.getContext('2d');
  fix = createVector(cv.width * 0.5, 50);
  r1 = random(cv.height - 50);
  r2 = random(cv.height - 50 - r1);
  setInterval(draw, 20);
}

const draw = function() {
  let a1_a = (-g * (2 * m1 + m2) * Math.sin(a1) - m2 * g * Math.sin(a1 - 2 * a2) - 2 * Math.sin(a1 - a2) * m2 * (a2_v * a2_v * r2 + a1_v * a1_v * r1 * Math.cos(a1 - a2))) /
    (r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2)));
  let a2_a = (2 * Math.sin(a1 - a2) * (a1_v * a1_v * r1 * (m1 + m2) + g * (m1 + m2) * Math.cos(a1) + a2_v * a2_v * r2 * m2 * Math.cos(a1 - a2))) / (r2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2)));
  ctx.save();
  background(cv, 'black');
  ctx.translate(fix.x, fix.y);
  let pend1 = createVector(r1 * Math.sin(a1), r1 * Math.cos(a1));
  let pend2 = Vector.add(pend1, createVector(r2 * Math.sin(a2), r2 * Math.cos(a2)));
  ctx.strokeStyle = 'white';
  ctx.fillStyle = 'white';
  ctx.line(0, 0, pend1.x, pend1.y);
  ctx.ellipse(pend1.x, pend1.y, m1, m1);
  ctx.line(pend1.x, pend1.y, pend2.x, pend2.y);
  ctx.ellipse(pend2.x, pend2.y, m2, m2);
  frames.pos.push(pend2);
  frames.cor.push(rgb(Math.randInt(255), Math.randInt(255), Math.randInt(255)));
  for (let i = 0; i < frames.pos.length; i++) {
    ctx.fillStyle = rgb(0, Math.floor(map(i, 0, frames.cor.length, 0, 255)), 0, 255);
    ctx.ellipse(frames.pos[i].x, frames.pos[i].y, 4, 4);
  }
  ctx.restore();
  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;
  if (res) {
    a1_v *= 1 - atrito;
    a2_v *= 1 - atrito;
  }
  if (frames.pos.length > nFrames) {
    frames.pos.shift();
    frames.cor.shift();
  }
}