export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
     <main>
        {children}
     </main>
    </>
  );
}