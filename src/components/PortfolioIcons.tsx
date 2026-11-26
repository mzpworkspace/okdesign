export function BrandMark() {
  return (
    <svg viewBox="0 0 32 34" aria-hidden="true">
      <path
        fill="currentColor"
        d="M1 12 15 4v7L1 19zm0 10 14-8v7L1 29zm17-10 13-8v7l-13 8zm0 10 13-8v7l-13 8z"
      />
    </svg>
  );
}
export function Icon({
  name,
}: {
  name: "brief" | "grid" | "cube" | "expand" | "close" | "previous" | "next";
}) {
  const paths = {
    brief: (
      <>
        <path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    cube: <path d="m12 3 9 5v8l-9 5-9-5V8zm0 9 9-4m-9 4L3 8m9 4v9" />,
    expand: <path d="M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4M8 12h8m-4-4v8" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    previous: <path d="m14 6-6 6 6 6" />,
    next: <path d="m10 6 6 6-6 6" />,
  };
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
