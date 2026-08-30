import { ExitButton } from "@/components/navigation/ExitButton";

// Shared wrapper for every case study page: adds the fixed "close" button
// that lets visitors jump back to the homepage from anywhere on the page.
export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ExitButton />
      {children}
    </>
  );
}
