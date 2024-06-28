// Matrix background effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()-_=+[]{}|;:,.<>/?`~';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }).fill(1);

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00FF00';
  ctx.font = `${fontSize}px monospace`;

  drops.forEach((y, index) => {
    const text = characters[Math.floor(Math.random() * characters.length)];
    const x = index * fontSize;
    ctx.fillText(text, x, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[index] = 0;
    }
    drops[index]++;
  });
}

setInterval(draw, 33);

// Fixed cipher for encoding and decoding
const fixedCipher = {
  'a': '1@अ', 'b': '2#आ', 'c': '3$इ', 'd': '4%ई', 'e': '5^उ',
  'f': '6&ऊ', 'g': '7*ऋ', 'h': '8(ए', 'i': '9)ऐ', 'j': '0-ओ',
  'k': '1_औ', 'l': '2+क', 'm': '3=ख', 'n': '4[ग', 'o': '5]घ',
  'p': '6{ङ', 'q': '7}च', 'r': '8|छ', 's': '9\\ज', 't': '0:झ',
  'u': '1;ञ', 'v': '2"ट', 'w': '3\'ठ', 'x': '4,ड', 'y': '5.ढ',
  'z': '6<ण', '0': '7>त', '1': '8?थ', '2': '9/द', '3': '0~ध',
  '4': '1!न', '5': '2@प', '6': '3#फ', '7': '4$ब', '8': '5%भ',
  '9': '6^म', ' ': '7&य'
};

// Encode function
function encode(text) {
  return text.toLowerCase().split('').map(c => fixedCipher[c] || c).join('');
}

// Decode function
function decode(text) {
  const reverseCipher = {};
  Object.keys(fixedCipher).forEach(key => {
    reverseCipher[fixedCipher[key]] = key;
  });

  // Since each encoded character is represented by a 3-character string,
  // we need to decode text in chunks of 3 characters
  const chunks = text.match(/.{1,3}/g) || [];  // Ensure we have an array of chunks
  return chunks.map(c => reverseCipher[c] || c).join('');
}

// Event listeners
document.getElementById('encode-btn').addEventListener('click', () => {
  const inputText = document.getElementById('input-text').value;
  const encodedText = encode(inputText);
  const outputText = document.getElementById('output-text');
  outputText.value = encodedText;
  outputText.classList.add('fade-in');
  outputText.classList.remove('decode');
  outputText.classList.add('encode');
});

document.getElementById('decode-btn').addEventListener('click', () => {
  const inputText = document.getElementById('input-text').value;
  const decodedText = decode(inputText);
  const outputText = document.getElementById('output-text');
  outputText.value = decodedText;
  outputText.classList.add('fade-in');
  outputText.classList.remove('encode');
  outputText.classList.add('decode');
});

document.getElementById('clear-btn').addEventListener('click', () => {
  document.getElementById('input-text').value = '';
  document.getElementById('output-text').value = '';
  document.getElementById('output-text').classList.remove('encode', 'decode');
});

// Copy function
function copyText() {
  const outputText = document.getElementById('output-text');
  outputText.select();
  document.execCommand('copy');
}
