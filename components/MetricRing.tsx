"use client";

interface Props {
  value: number;
  label: string;
  description: string;
}

export default function MetricRing({ value, label, description }: Props) {
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (value / 100) * circumference;

  return (
    <div className="group flex flex-col items-center relative">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="rgba(255,255,255,0.08)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="url(#gradient)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute text-lg font-semibold text-white">
        {value}
      </div>

      <div className="mt-3 text-sm text-white/60">{label}</div>

      {/* Hover Tooltip */}
      <div className="absolute bottom-[-40px] opacity-0 group-hover:opacity-100 transition text-xs bg-black/80 px-3 py-1 rounded-lg">
        {description}
      </div>
    </div>
  );
}