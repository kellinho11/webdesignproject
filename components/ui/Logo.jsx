// A marca: três órbitas e o núcleo. O degradê das órbitas (#logo-grad) é definido uma vez por página,
// no logo do cabeçalho (defs); os outros logos da página usam o mesmo.
export default function Logo({ size = 32, defs = false }) {
  return (
    <svg className="logo" viewBox="-20 -20 40 40" width={size} height={size} aria-hidden="true">
      {defs && (
        <defs>
          <linearGradient id="logo-grad" x1="-18" y1="-18" x2="18" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#6B46FF" />
          </linearGradient>
        </defs>
      )}
      <g className="logo__orbits" fill="none" stroke="url(#logo-grad)" strokeWidth="1.6">
        <ellipse rx="17" ry="6.5" transform="rotate(20)" />
        <ellipse rx="17" ry="6.5" transform="rotate(-20)" />
        <ellipse rx="17" ry="6.5" transform="rotate(90)" />
      </g>
      <circle r="3" fill="#6B46FF" />
    </svg>
  );
}
