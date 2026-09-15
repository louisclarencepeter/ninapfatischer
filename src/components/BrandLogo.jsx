export default function BrandLogo({ className = '', loading = 'eager' }) {
  return (
    <img
      className={`np-brand-logo ${className}`.trim()}
      src="/brand/salty-shavasana-logo-v1.png"
      width="768"
      height="470"
      alt="Salty Shavasana — Nina Pfatischer Yoga"
      loading={loading}
    />
  )
}
