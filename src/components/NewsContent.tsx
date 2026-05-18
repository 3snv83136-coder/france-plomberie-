import { Block } from "./GuideContent";
import type { GuideBlock } from "@/data/guides/types";
import type { NewsBlock } from "@/lib/news/types";

// NewsBlock is structurally identical to GuideBlock, so we widen the cast.
export function NewsContent({ blocks }: { blocks: NewsBlock[] }) {
  return (
    <div className="space-y-4 text-[15px] leading-relaxed">
      {blocks.map((block, i) => (
        <Block key={i} block={block as GuideBlock} />
      ))}
    </div>
  );
}
