const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
const clearScreen = () => {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const size = 50;
const drawTPiece = () => {
  const startingX = Math.floor(Math.random() * (canvas.width - size));
  const startingY = Math.floor(Math.random() * (canvas.height - size));
  ctx.fillStyle = '#a159f1';
  ctx.fillRect(startingX, startingY, size, size);
  ctx.fillRect(startingX - size, startingY + size, size, size);
  ctx.fillRect(startingX, startingY + size, size, size);
  ctx.fillRect(startingX + size, startingY + size, size, size);
};
const drawLPiece = () => {
  const startingX = Math.floor(Math.random() * (canvas.width - size));
  const startingY = Math.floor(Math.random() * (canvas.height - size));
  ctx.fillStyle = '#efa025';
  ctx.fillRect(startingX, startingY, size, size);
  ctx.fillRect(startingX - (size * 2), startingY + size, size, size);
  ctx.fillRect(startingX - size, startingY + size, size, size);
  ctx.fillRect(startingX, startingY + size, size, size);
};
const drawJPiece = () => {
  const startingX = Math.floor(Math.random() * (canvas.width - size));
  const startingY = Math.floor(Math.random() * (canvas.height - size));
  ctx.fillStyle = '#175cf1';
  ctx.fillRect(startingX, startingY, size, size);
  ctx.fillRect(startingX + (size * 2), startingY + size, size, size);
  ctx.fillRect(startingX, startingY + size, size, size);
  ctx.fillRect(startingX + size, startingY + size, size, size);
};
const drawZPiece = () => {
  const startingX = Math.floor(Math.random() * (canvas.width - size));
  const startingY = Math.floor(Math.random() * (canvas.height - size));
  ctx.fillStyle = '#f00000';
  ctx.fillRect(startingX, startingY, size, size);
  ctx.fillRect(startingX + size, startingY, size, size);
  ctx.fillRect(startingX + size, startingY + size, size, size);
  ctx.fillRect(startingX + (size * 2), startingY + size, size, size);
};
const drawSPiece = () => {
  const startingX = Math.floor(Math.random() * (canvas.width - size));
  const startingY = Math.floor(Math.random() * (canvas.height - size));
  ctx.fillStyle = '#4bf145';
  ctx.fillRect(startingX, startingY, size, size);
  ctx.fillRect(startingX - size, startingY, size, size);
  ctx.fillRect(startingX - size, startingY + size, size, size);
  ctx.fillRect(startingX - (size * 2), startingY + size, size, size);
};
const drawOPiece = () => {
  const startingX = Math.floor(Math.random() * (canvas.width - size));
  const startingY = Math.floor(Math.random() * (canvas.height - size));
  ctx.fillStyle = '#eff142';
  ctx.fillRect(startingX, startingY, size, size);
  ctx.fillRect(startingX + size, startingY, size, size);
  ctx.fillRect(startingX + size, startingY + size, size, size);
  ctx.fillRect(startingX, startingY + size, size, size);
};
const drawIPiece = () => {
  const startingX = Math.floor(Math.random() * (canvas.width - size));
  const startingY = Math.floor(Math.random() * (canvas.height - size));
  ctx.fillStyle = '#00f0f0';
  ctx.fillRect(startingX, startingY, size, size);
  ctx.fillRect(startingX, startingY + size, size, size);
  ctx.fillRect(startingX, startingY + (size * 2), size, size);
  ctx.fillRect(startingX, startingY + (size * 3), size, size);
};

resize();
setInterval(() => {
  clearScreen();
  drawTPiece();
  drawLPiece();
  drawJPiece();
  drawZPiece();
  drawSPiece();
  drawOPiece();
  drawIPiece();
}, 1500);

document.addEventListener('resize', resize);
