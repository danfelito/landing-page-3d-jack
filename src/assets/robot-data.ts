const robotPortrait = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="60%">
      <stop offset="0" stop-color="#23283d"/>
      <stop offset="1" stop-color="#080910" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="metal" x1="10%" y1="20%" x2="90%" y2="90%">
      <stop offset="0" stop-color="#7d879a"/>
      <stop offset="0.35" stop-color="#242938"/>
      <stop offset="0.65" stop-color="#485267"/>
      <stop offset="1" stop-color="#111520"/>
    </linearGradient>
    <linearGradient id="neon" x1="0" x2="1">
      <stop offset="0" stop-color="#ff4ee8"/>
      <stop offset="1" stop-color="#4deaff"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="900" height="900" fill="none"/>
  <ellipse cx="450" cy="470" rx="310" ry="360" fill="url(#bg)" opacity="0.85"/>
  <path d="M285 760 C320 820 580 820 615 760 L655 590 L650 360 C632 205 540 122 450 122 C360 122 268 205 250 360 L245 590 Z" fill="url(#metal)" stroke="#9da9c5" stroke-width="3"/>
  <path d="M450 118 C405 118 365 130 330 155 L350 230 L450 245 L550 230 L570 155 C535 130 495 118 450 118Z" fill="#1b2030" stroke="#77819a" stroke-width="3"/>
  <path d="M356 236 L544 236 L590 318 L542 398 L358 398 L310 318Z" fill="#343b4d" stroke="#a7b0c8" stroke-width="3"/>
  <rect x="400" y="283" width="100" height="78" rx="10" fill="#6e5ac8" stroke="#e5e7ff" stroke-width="3"/>
  <text x="450" y="328" text-anchor="middle" font-family="Arial, sans-serif" font-size="44" font-weight="800" fill="white">AI</text>
  <text x="450" y="350" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="white">CORES</text>
  <path d="M230 395 C180 425 178 520 236 565 L258 485Z" fill="#202738" stroke="#68738d" stroke-width="3"/>
  <path d="M670 395 C720 425 722 520 664 565 L642 485Z" fill="#202738" stroke="#68738d" stroke-width="3"/>
  <path d="M292 408 L392 382 L422 438 L383 505 L285 496 L260 452Z" fill="#161b27" stroke="#828ca5" stroke-width="3"/>
  <path d="M608 408 L508 382 L478 438 L517 505 L615 496 L640 452Z" fill="#161b27" stroke="#828ca5" stroke-width="3"/>
  <circle cx="350" cy="445" r="39" fill="#ff45e6" filter="url(#glow)"/>
  <circle cx="350" cy="445" r="15" fill="#fff3ff"/>
  <circle cx="550" cy="445" r="39" fill="#48eaff" filter="url(#glow)"/>
  <circle cx="550" cy="445" r="15" fill="#f0ffff"/>
  <path d="M450 420 C425 496 402 540 386 592 C410 610 490 610 514 592 C498 540 475 496 450 420Z" fill="#4f586d" stroke="#b4bed8" stroke-width="3"/>
  <path d="M365 650 C410 685 490 685 535 650" fill="none" stroke="#bfc7dc" stroke-width="8" stroke-linecap="round"/>
  <path d="M340 670 C405 730 495 730 560 670 L535 760 C492 790 408 790 365 760Z" fill="#151a27" stroke="#707a94" stroke-width="3"/>
  <g stroke="url(#neon)" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.95">
    <path d="M290 300 L358 300 L390 350"/><path d="M610 300 L542 300 L510 350"/>
    <path d="M315 545 L386 570 L390 640"/><path d="M585 545 L514 570 L510 640"/>
    <path d="M450 362 L450 430"/><path d="M450 610 L450 720"/>
    <path d="M335 245 L335 190 L385 170"/><path d="M565 245 L565 190 L515 170"/>
  </g>
  <g fill="#c9d2ea" opacity="0.75">
    <circle cx="305" cy="330" r="5"/><circle cx="595" cy="330" r="5"/><circle cx="335" cy="575" r="4"/><circle cx="565" cy="575" r="4"/>
    <rect x="312" y="368" width="52" height="6" rx="3"/><rect x="536" y="368" width="52" height="6" rx="3"/>
    <rect x="383" y="710" width="134" height="10" rx="5"/>
  </g>
  <path d="M282 760 L208 890 H692 L618 760 C570 808 330 808 282 760Z" fill="#1c2231" stroke="#6f7a94" stroke-width="3"/>
  <path d="M218 840 L350 790 M682 840 L550 790" stroke="url(#neon)" stroke-width="5" opacity="0.8"/>
</svg>
`)}`;

export default robotPortrait;
