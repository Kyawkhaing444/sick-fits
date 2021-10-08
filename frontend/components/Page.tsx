interface Props{
  children: any
}
export default function Page({ children }: Props) {
  return (
    <div>
      <h1>Hi! This is the nav component</h1>
      { children }
    </div>
  );
}
