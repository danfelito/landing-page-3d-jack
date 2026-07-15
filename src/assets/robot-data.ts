const robotPortrait = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#3d3d48"/>
      <stop offset="60%" stop-color="#15151a"/>
      <stop offset="100%" stop-color="#050507"/>
    </radialGradient>
    <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#d9dde7"/>
      <stop offset="0.45" stop-color="#8f96a5"/>
      <stop offset="1" stop-color="#f4f6fb"/>
    </linearGradient>
    <linearGradient id="face" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f7f7fb"/>
      <stop offset="0.5" stop-color="#b6bcc8"/>
      <stop offset="1" stop-color="#fbfbff"/>
    </linearGradient>
    <filter id="glowPink" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="16" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowBlue" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="16" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="35" stdDeviation="28" flood-color="#000" flood-opacity="0.55"/>
    </filter>
  </defs>
  <rect width="900" height="900" fill="transparent"/>
  <g filter="url(#shadow)">
    <path d="M210 445c0-145 94-250 240-250s240 105 240 250v95c0 150-108 245-240 245s-240-95-240-245z" fill="url(#metal)"/>
    <path d="M249 441c0-111 81-190 201-190s201 79 201 190v104c0 112-82 184-201 184s-201-72-201-184z" fill="url(#face)"/>
    <path d="M247 430c12-116 90-179 203-179s191 63 203 179c-44-56-116-89-203-89s-159 33-203 89z" fill="#fff" opacity="0.42"/>
    <path d="M160 488c0-46 27-78 61-78h28v165h-28c-34 0-61-32-61-78z" fill="#a5abb6"/>
    <path d="M651 410h28c34 0 61 32 61 78v9c0 46-27 78-61 78h-28z" fill="#a5abb6"/>
    <rect x="266" y="379" width="368" height="151" rx="75" fill="#171820"/>
    <ellipse cx="374" cy="454" rx="62" ry="47" fill="#ff3edb" filter="url(#glowPink)"/>
    <ellipse cx="526" cy="454" rx="62" ry="47" fill="#42d7ff" filter="url(#glowBlue)"/>
    <ellipse cx="374" cy="454" rx="26" ry="20" fill="#fff" opacity="0.9"/>
    <ellipse cx="526" cy="454" rx="26" ry="20" fill="#fff" opacity="0.9"/>
    <path d="M348 620c62 40 145 40 204 0" fill="none" stroke="#3d414d" stroke-width="18" stroke-linecap="round" opacity="0.45"/>
    <circle cx="450" cy="158" r="38" fill="#cbd1dd"/>
    <path d="M450 196v52" stroke="#cbd1dd" stroke-width="18" stroke-linecap="round"/>
  </g>
</svg>
`)}`;

export default robotPortrait;
