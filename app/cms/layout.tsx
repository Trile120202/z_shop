export default function CMSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="cms-layout">
      <nav className="cms-sidebar">
        {/* Thêm các mục menu quản trị ở đây */}
        <ul>
          <li>Dashboard</li>
          <li>Users</li>
          <li>Content</li>
          {/* ... */}
        </ul>
      </nav>
      <main className="cms-main">{children}</main>
    </div>
  );
}