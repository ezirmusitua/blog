"use client";

import classnames from "classnames";
import CopyBtn from "components/CopyBtn";
import { useCallback, useMemo, useState } from "react";

function CodeBlock(props: any) {
  const [content, set_content] = useState("");
  const meta = useMemo(() => JSON.parse(props.meta), [props.meta]);

  const copyable = useMemo(() => {
    return meta.copyable == "" || meta.copyable == "true";
  }, [meta.copyable]);

  const className = useMemo(
    () => classnames("code-block", "relative", "rounded-md", props.className),
    [props.className]
  );

  const get_copyable_content = useCallback(
    (elem: HTMLElement) => {
      if (!copyable) return "";
      set_content(elem?.innerText);
    },
    [copyable]
  );

  return (
    <code className={className} ref={get_copyable_content}>
      {props.children}
      {copyable && <CopyBtn content={content}></CopyBtn>}
    </code>
  );
}

export default CodeBlock;
