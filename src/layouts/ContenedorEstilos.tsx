import useStore from "../store/useStore";

export default function ContenedorEstilos({
  children,
}: {
  children: React.ReactNode;
}) {
  const { diseñoInStore } = useStore();
  return (
    <div className={diseñoInStore} style={{
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto'
    }}>
      {children}
    </div>)
}
