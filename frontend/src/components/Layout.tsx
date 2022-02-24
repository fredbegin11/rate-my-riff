import Navbar from './Navbar';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="App bg-slate-100 min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
