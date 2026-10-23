// VECTOR SVG SPRITES
export const heroSvg = `<svg width="140" height="140" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="35" fill="rgba(0, 240, 255, 0.1)" stroke="#00f0ff" stroke-width="2"/>
    <path d="M50 20 L65 50 L50 80 L35 50 Z" fill="url(#heroGrad)"/>
    <circle cx="50" cy="40" r="8" fill="#fff"/>
    <defs>
        <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#00f0ff"/>
            <stop offset="100%" stop-color="#7000ff"/>
        </linearGradient>
    </defs>
</svg>`;

export const enemyHoundSvg = `<svg width="140" height="140" viewBox="0 0 100 100" fill="none">
    <path d="M20 70 L40 30 L80 40 L60 80 Z" fill="#9d4edd" stroke="#ff0055" stroke-width="2"/>
    <circle cx="45" cy="40" r="5" fill="#ff0055"/>
    <path d="M70 45 L90 50 L75 60 Z" fill="#ff0055"/>
</svg>`;

export const enemyBossSvg = `<svg width="160" height="160" viewBox="0 0 100 100" fill="none">
    <polygon points="50,10 90,50 50,90 10,50" fill="rgba(255, 42, 109, 0.2)" stroke="#ff2a6d" stroke-width="3"/>
    <circle cx="50" cy="50" r="20" fill="#ff2a6d"/>
    <circle cx="50" cy="50" r="8" fill="#fff"/>
</svg>`;
