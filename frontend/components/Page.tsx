import Header from './Header';

interface Props {
  children: any;
}
export default function Page({ children }: Props) {
  return (
    <div>
      <Header />
      <h1>Hi! This is the nav component</h1>
      {children}
    </div>
  );
}
