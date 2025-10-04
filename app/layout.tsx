import "./globals.css";
import { AOSInit } from "@/components/common/AosInit";
// TODO: Intentar arreglar warnings del console
// TODO: Error files: https://next-intl.dev/docs/environments/error-files
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AOSInit />
      {children}
    </>
  );
}
