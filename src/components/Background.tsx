/** Hero background: the provided photo, shown as-is. */
export default function Background() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-ink">
      <img src="/bg.jpg" alt="" decoding="async" fetchPriority="high" className="h-full w-full object-cover object-center" />
    </div>
  );
}
