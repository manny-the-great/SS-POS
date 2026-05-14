import PublicNavbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
