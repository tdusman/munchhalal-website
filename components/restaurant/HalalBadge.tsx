import { Restaurant } from '@/types';

interface HalalBadgeProps {
  type: Restaurant['halalCertType'];
  size?: 'sm' | 'md';
}

export default function HalalBadge({ type, size = 'sm' }: HalalBadgeProps) {
  const styles = {
    certified: 'bg-green-500/20 text-green-400 border-green-500/30',
    self_declared: 'bg-zinc-700/50 text-zinc-400 border-zinc-600/30',
    unknown: 'bg-zinc-700/50 text-zinc-500 border-zinc-600/30',
  };

  const labels = {
    certified: '✓ Certified Halal',
    self_declared: 'Self Declared',
    unknown: 'Unknown',
  };

  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1';

  return (
    <span className={`inline-flex items-center font-semibold rounded-full border ${styles[type]} ${sizeClasses}`}>
      {labels[type]}
    </span>
  );
}
