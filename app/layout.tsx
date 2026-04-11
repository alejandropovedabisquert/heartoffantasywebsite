import "./globals.css";
// TODO: Intentar arreglar warnings del console
// TODO: Error files: https://next-intl.dev/docs/environments/error-files
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
