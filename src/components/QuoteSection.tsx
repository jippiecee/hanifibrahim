import { experience } from "../data/experience";
import Quote from "./Quote";

export default function QuoteSection() {
  return (
    <section id="quote" className="relative z-10 bg-[#050506] px-5 pb-0 pt-32 md:px-12 md:pt-44">
      <div className="mx-auto max-w-7xl"><Quote text={experience.quote} /></div>
    </section>
  );
}