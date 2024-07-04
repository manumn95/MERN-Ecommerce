import { useSelector } from "react-redux";
import { LuUserCircle2 } from "react-icons/lu";
import { Link, Outlet } from "react-router-dom";
const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user?.data);
  return (
    <>
      <div className="min-h-[calc(100vh-120px)] md:flex hidden">
        <aside className="bg-white min-h-full w-full max-w-60 customeShadow">
          <div className="h-32 flex flex-col justify-center items-center">
            <div className="text-6xl cursor-pointer relative flex justify-center">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-20 h-20 rounded-full"
                  alt={user?.name}
                ></img>
              ) : (
                <LuUserCircle2 />
              )}
            </div>
            <p className="capitalize font-semibold text-lg">{user?.name}</p>
            <p className="text-sm">{user?.role}</p>
          </div>

<div>
  {/* navigation */}
  <nav className="grid p-4">
   <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">All users</Link>
   <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">All Products</Link>
  </nav>
</div>

        </aside>
        <main className="w-full h-full p-4">
          <Outlet></Outlet>
        </main>
      </div>
    </>
  );
};

export default AdminPanel;
