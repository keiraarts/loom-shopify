function Index({ children }) {
  return (
    <div className="flex flex-col justify-between min-h-screen ">
      <main className="flex flex-col flex-1 h-full">
        <div className="flex flex-col flex-1 overflow-hidden">{children}</div>
      </main>
    </div>
  );
}

export default Index;
