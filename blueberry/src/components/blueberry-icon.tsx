export function BlueberryIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Berry body */}
      <ellipse cx="32" cy="36" rx="22" ry="24" fill="#4F46E5" />
      <ellipse cx="32" cy="36" rx="22" ry="24" fill="url(#berryGrad)" />

      {/* Highlight */}
      <ellipse cx="24" cy="28" rx="8" ry="10" fill="white" opacity="0.15" />

      {/* Crown / calyx */}
      <path
        d="M26 14 C28 12, 30 10, 32 8 C34 10, 36 12, 38 14"
        stroke="#4F46E5"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M24 16 C26 13, 28 11, 30 10"
        stroke="#6366F1"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M40 16 C38 13, 36 11, 34 10"
        stroke="#6366F1"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Star pattern on top */}
      <circle cx="29" cy="16" r="1.5" fill="#6366F1" />
      <circle cx="35" cy="16" r="1.5" fill="#6366F1" />
      <circle cx="32" cy="14" r="1.5" fill="#6366F1" />
      <circle cx="27" cy="18" r="1" fill="#6366F1" />
      <circle cx="37" cy="18" r="1" fill="#6366F1" />

      {/* Subtle texture dots */}
      <circle cx="22" cy="38" r="1" fill="white" opacity="0.08" />
      <circle cx="38" cy="32" r="1" fill="white" opacity="0.08" />
      <circle cx="30" cy="48" r="1" fill="white" opacity="0.08" />
      <circle cx="40" cy="44" r="1" fill="white" opacity="0.08" />

      <defs>
        <radialGradient id="berryGrad" cx="0.35" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#818CF8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#312E81" stopOpacity="0.3" />
        </radialGradient>
      </defs>
    </svg>
  );
}
