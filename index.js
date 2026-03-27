const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('download');

const SIZE = 500;

// Upload
upload.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = await carregarImagem(file);
    processarImagem(img);
});

// Função async (nível profissional)
async function carregarImagem(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        const img = new Image();

        reader.onload = (e) => img.src = e.target.result;
        img.onload = () => resolve(img);

        reader.readAsDataURL(file);
    });
}

// Processamento
function processarImagem(img) {
    limparCanvas();
    fundoBlur(img);
    desenharPrincipal(img);
    overlay();
    borda();
}

// Limpar
function limparCanvas() {
    ctx.clearRect(0, 0, SIZE, SIZE);
}

// Fundo desfocado
function fundoBlur(img) {
    ctx.save();
    ctx.filter = "blur(20px) brightness(0.7)";
    ctx.drawImage(img, 0, 0, SIZE, SIZE);
    ctx.restore();
}

// Imagem principal
function desenharPrincipal(img) {
    const min = Math.min(img.width, img.height);

    const sx = (img.width - min) / 2;
    const sy = (img.height - min) / 2.5;

    ctx.save();

    ctx.beginPath();
    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2.2, 0, Math.PI * 2);
    ctx.clip();

    ctx.drawImage(img, sx, sy, min, min, 0, 0, SIZE, SIZE);

    ctx.restore();
}

// Overlay
function overlay() {
    const gradient = ctx.createLinearGradient(0, 0, SIZE, SIZE);
    gradient.addColorStop(0, "rgba(10,102,194,0.2)");
    gradient.addColorStop(1, "rgba(0,65,130,0.2)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, SIZE, SIZE);
}

// Borda
function borda() {
    ctx.strokeStyle = "#0a66c2";
    ctx.lineWidth = 6;
    ctx.strokeRect(0, 0, SIZE, SIZE);
}

// Download
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'foto-linkedin.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});