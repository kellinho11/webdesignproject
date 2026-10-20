// Manchas de luz paradas atrás dos painéis de vidro: sem algo colorido por trás, o desfoque não aparece.
const PRESETS = {
  demo: [
    { x: '8%', y: '30%', d: '520px', c: 'rgba(107, 70, 255, 0.45)' },
    { x: '58%', y: '45%', d: '600px', c: 'rgba(59, 130, 246, 0.35)' },
  ],
  api: [
    { x: '48%', y: '0%', d: '460px', c: 'rgba(59, 130, 246, 0.5)' },
    { x: '72%', y: '12%', d: '420px', c: 'rgba(107, 70, 255, 0.5)' },
  ],
};

export default function GlassOrbs({ preset }) {
  return (
    <div className="glass-orbs" aria-hidden="true">
      {PRESETS[preset].map((o, i) => (
        <i key={i} style={{ '--x': o.x, '--y': o.y, '--d': o.d, '--c': o.c }} />
      ))}
    </div>
  );
}
