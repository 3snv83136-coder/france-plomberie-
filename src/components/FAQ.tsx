export function FAQ({ items, title = "Questions fréquentes" }: { items: { q: string; a: string }[]; title?: string }) {
  if (items.length === 0) return null;
  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="space-y-2">
        {items.map((item, i) => (
          <details
            key={i}
            className="card p-4 group"
            {...(i === 0 ? { open: true } : {})}
          >
            <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
              <span>{item.q}</span>
              <span className="text-muted-foreground group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
