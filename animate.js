const rain = [];
const drops = [];
const gravity = 0.1;
const wind = 0.0;
const rain_chance = 0.01;
const colors = [
  "#f6cf7f",
  "#cdebdc",
  "#b80800",
  "#37b7f4",
  "#c9d336",
  "#3329cc",
  "#80428c",
  "#84be78",
  "#ecdfef",
  "#121c10",
  "#405c6b",
  "#bda79a",
  "#173380",
  "#f6cf7f",
  "#162768",
  "#f5da97",
  "#f4e3d4",
  "#051a2c",
  "#6c35ff",
  "#98cf00",
  "#111111",
  "#8d35bb",
  "#454545",
  "#ec665f",
  "#003162",
  "#bc5e57",
  "#262626",
  "#a52ee9",
  "#1a297e",
  "#f0d981",
  "#e1c827",
  "#1a34de",
  "#cef465",
  "#2f089c",
  "#763e29",
  "#0fa6e1",
  "#55e869",
  "#ac1396",
  "#c90000",
  "#23cad9",
  "#f19bd5",
  "#076325",
  "#3b3b3b",
  "#059950",
  "#3f3f3f",
  "#e9594c",
  "#803f26",
  "#1babe3",
  "#3e4481",
  "#b1930e",
  "#303030",
  "#bd5e36",
  "#90004d",
  "#3ea671",
  "#353535",
  "#f32459",
  "#501c2b",
  "#b5e4d7",
  "#001f00",
  "#8e555f",
  "#ceb543",
  "#2d47bf",
  "#445855",
  "#b9abad",
  "#003700",
  "#ac5b91",
  "#74bad1",
  "#80432e",
  "#380f41",
  "#c9f5bf",
  "#002300",
  "#81598d",
  "#1e1e1e",
  "#6e6c08",
  "#7d4030",
  "#88c0d0",
  "#b8a9d8",
  "#455228",
  "#343434",
  "#05920e",
  "#245e3b",
  "#d9a5c5",
  "#a2a8be",
  "#595442",
  "#45156b",
  "#bcef94",
  "#c02f38",
  "#40d9cc",
  "#3d443b",
  "#f41df0",
  "#2b2b2b",
  "#16853d",
  "#2c2de9",
  "#e2d617",
  "#73f668",
  "#8d0498",
  "#6a2d12",
  "#96d7f3",
  "#30f7f5",
  "#f10406",
  "#1f3952",
  "#e9c9ac",
  "#9e450d",
  "#63befc",
  "#423d3a",
  "#1f8ddc",
  "#9b3379",
  "#6acc8a",
  "#353555",
  "#cccdb0",
  "#784257",
  "#01ba61",
  "#9ecc4a",
  "#6030b7",
  "#313131",
  "#d03f98",
  "#6fdc75",
  "#911f8a",
  "#2f2f2f",
  "#d624b1",
  "#00223c",
  "#a85040",
  "#313131",
  "#d52bbb",
  "#66f2ae",
  "#9d0950",
  "#a1b097",
  "#594d62",
  "#171717",
  "#8042c7",
  "#e21b6d",
  "#1eff95",
  "#b70c85",
  "#45cd74",
  "#4a0812",
  "#b6fef2",
  "#4721d0",
  "#bee32f",
  "#1d5141",
  "#eeb0c2",
  "#3c3c3c",
  "#f9411a",
  "#004100",
  "#8a7c86",
  "#63dc25",
  "#9c1fdd",
  "#a52bd1",
  "#5cdc2e",
  "#9c3b58",
  "#28c68f",
  "#760022",
  "#329075",
  "#1e1e1e",
  "#0366ce",
  "#0040e9",
  "#b7aa0f",
  "#3d43d7",
  "#aab029",
  "#82e1bf",
  "#801a3e",
  "#783b7a",
  "#3eb83a",
];

window.requestAnimFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    if (v.x != null && v.y != null) {
      this.x += v.x;
      this.y += v.y;
    } else {
      this.x += v;
      this.y += v;
    }

    return this;
  }

  copy() {
    return new Vector(this.x, this.y);
  }
}

class Rain {
  constructor() {
    this.pos = new Vector(Math.random() * canvas.width, -50);
    this.prev = this.pos;
    this.vel = new Vector();
    this.color = colors[Math.round(Math.random() * (colors.length - 1))];
  }

  update() {
    this.prev = this.pos.copy();
    this.vel.y += gravity;
    this.vel.x += wind;
    this.pos.add(this.vel);
  }

  draw(ctx) {
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(this.prev.x, this.prev.y);
    ctx.stroke();
  }
}

class Drop {
  constructor(x, y) {
    const dist = Math.random() * 7;
    const angle = Math.PI + Math.random() * Math.PI;

    this.pos = new Vector(x, y);
    this.vel = new Vector(Math.cos(angle) * dist, Math.sin(angle) * dist);
  }

  update() {
    this.vel.y += gravity;
    this.vel.x *= 0.95;
    this.vel.y *= 0.95;
    this.pos.add(this.vel);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 1, 0, Math.PI * 2);
    ctx.fill();
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let i = rain.length;
  document.title = i % 2 == 0 ? "Danny Glunz" : "!!!!!!!!!!!";

  while (i--) {
    const raindrop = rain[i];

    raindrop.update();

    if (raindrop.pos.y >= canvas.height) {
      let n = Math.round(2 + Math.random() * 2);

      while (n--) drops.push(new Drop(raindrop.pos.x, canvas.height));
      rain.splice(i, 1);

      document
        .getElementById("title-bar")
        .style.setProperty("background-color", raindrop.color);
    }

    raindrop.draw(ctx);
  }

  i = drops.length;
  while (i--) {
    const drop = drops[i];
    drop.update();
    drop.draw(ctx);

    if (drop.pos.y > canvas.height) drops.splice(i, 1);
  }

  if (Math.random() < rain_chance) rain.push(new Rain());

  requestAnimFrame(update);
}

function init() {
  ctx.lineWidth = 1;
  update();
}

init();
