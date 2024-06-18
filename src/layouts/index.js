import { Outlet } from "react-router-dom";
import Nav from "../components/Header";

export default function HomeLayout({ products, setSearch }) {
  return (
    <>
      <Nav products={products} setSearch={setSearch} />
      <Outlet />
    </>
  );
}
