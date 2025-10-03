import "./globals.css";
import { AOSInit } from "@/components/common/AosInit";
// TODO: Intentar arreglar warnings del console
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AOSInit />
      {children}
    </>
  );
}
