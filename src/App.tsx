import { useLenis } from "./hooks/useLenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
export default function App() {
  useLenis();
  return <><Navbar /><main><Hero /><Experience /><Projects /></main></>;
}