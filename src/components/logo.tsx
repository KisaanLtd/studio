import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-primary", className)}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M12 12c-3 0-5 2.5-5 5" />
      <path d="M12 12c3 0 5 2.5 5 5" />
      <path d="M12 2v10" />
      <path d="M12 12c-5 0-8 2.5-8 5" />
      <path d="M12 12c5 0 8 2.5 8 5" />
    </svg>
  );
};

export default Logo;
