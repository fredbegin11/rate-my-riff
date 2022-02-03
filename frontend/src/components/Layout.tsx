import Navbar from './Navbar';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="App">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
