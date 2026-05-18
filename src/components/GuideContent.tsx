import { AlertTriangle, CheckCircle2, Info, Lightbulb } from "lucide-react";
import type { GuideBlock, GuideSection } from "@/data/guides/types";

export function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "p":
      return <p className="leading-relaxed">{block.text}</p>;
    case "h3":
      return (
        <h3 id={block.id} className="text-lg md:text-xl font-bold mt-6 mb-2 scroll-mt-20">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="list-disc pl-6 space-y-1.5 leading-relaxed">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal pl-6 space-y-1.5 leading-relaxed">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="min-w-full text-sm border border-border rounded-lg">
            <thead className="bg-muted/50">
              <tr>
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="text-left px-3 py-2 font-semibold border-b border-border"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-t border-border">
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            {block.caption && (
              <caption className="caption-bottom text-xs text-muted-foreground py-2">
                {block.caption}
              </caption>
            )}
          </table>
        </div>
      );
    case "callout": {
      const styles: Record<typeof block.variant, { ring: string; bg: string; Icon: typeof Info }> = {
        tip: { ring: "border-primary/30", bg: "bg-primary/5", Icon: Lightbulb },
        warning: { ring: "border-destructive/30", bg: "bg-destructive/5", Icon: AlertTriangle },
        info: { ring: "border-blue-500/30", bg: "bg-blue-500/5", Icon: Info },
        success: { ring: "border-accent/30", bg: "bg-accent/5", Icon: CheckCircle2 },
      };
      const { ring, bg, Icon } = styles[block.variant];
      return (
        <div className={`my-4 rounded-lg border ${ring} ${bg} p-4 flex gap-3`}>
          <Icon className="w-5 h-5 shrink-0 mt-0.5 opacity-80" />
          <div>
            {block.title && <div className="font-semibold mb-1">{block.title}</div>}
            <p className="text-sm leading-relaxed">{block.text}</p>
          </div>
        </div>
      );
    }
    case "quote":
      return (
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
          <p>{block.text}</p>
          {block.author && (
            <footer className="text-sm mt-2 not-italic">— {block.author}</footer>
          )}
        </blockquote>
      );
  }
}

export function GuideContent({ sections }: { sections: GuideSection[] }) {
  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{section.heading}</h2>
          <div className="space-y-4 text-[15px] leading-relaxed">
            {section.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
