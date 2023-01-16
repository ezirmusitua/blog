"use client"
import { useCallback, useEffect, useState } from "react";

function CopyBtn({ content }: { content: string }) {
  const [copied, set_copied] = useState(false);
  const [timer, set_timer] = useState<any>(null);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(content);
    set_copied(true);
  }, [content]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => {
      set_copied(false);
      clearTimeout(timer);
      set_timer(null);
    }, 800);
    set_timer(t);
  }, [timer, copied]);

  return (
    <button className="copy-btn absolute top-0 right-0" onClick={copy}>
      <span className="text-lg">{copied ? "✅" : "📋"}</span>
    </button>
  );
}

export default CopyBtn;
