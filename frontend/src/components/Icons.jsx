const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false"
};

export function Check(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m20 6-11 11-5-5" />
    </svg>
  );
}

export function Clock(props) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function Users(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function Waves(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M2 15c3-4 6-4 9 0s6 4 9 0" />
      <path d="M2 9c3-4 6-4 9 0s6 4 9 0" />
    </svg>
  );
}

export function ArrowRight(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function Calendar(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

export function MapPin(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function Phone(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M5 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L14 12l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 5.2 2 2 0 0 1 5 3Z" />
    </svg>
  );
}

export function Mail(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="3" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function MenuIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Instagram(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}
