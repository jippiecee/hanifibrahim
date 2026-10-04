import { useLenis } from "./hooks/useLenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import CreatorStats from "./components/CreatorStats";
import QuoteSection from "./components/QuoteSection";
import HandsBridge from "./components/HandsBridge";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import MoreContact from "./components/MoreContact";
export default function App() {
  useLenis();
  return <><Navbar /><main><Hero /><Experience /><CreatorStats /><QuoteSection /><HandsBridge /><Projects /><Contact /><MoreContact /></main></>;
}