"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import config from "config";

declare global {
  interface Window {
    REMARK42: any;
    remark_config: any;
  }
}

const insertScript = (
  id: string,
  parentElement: HTMLElement,
  config: iRemark42Config
) => {
  if (document.querySelector(`#${id}`)) return;
  const script = window.document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.setAttribute("id", id);
  let url = window.location.origin + window.location.pathname;
  url = url.endsWith("/") ? url.slice(0, -1) : url;
  const _config = { ...config, url };
  // Now the actual config and script-fetching function:
  script.innerHTML = `
    var remark_config = ${JSON.stringify(_config)};
    !function(e,n){for(var o=0;o<e.length;o++){var r=n.createElement("script"),c=".js",d=n.head||n.body;"noModule"in r?(r.type="module",c=".mjs"):r.async=!0,r.defer=!0,r.src=remark_config.host+"/web/"+e[o]+c,d.appendChild(r)}}(remark_config.components||["embed"],document);`;
  parentElement.appendChild(script);
};

const removeScript = (id: string, parentElement: HTMLElement) => {
  const script = window.document.getElementById(id);
  if (script) {
    parentElement.removeChild(script);
  }
};

const manageScript = (config: iRemark42Config) => {
  if (!window) {
    return () => {};
  }
  const { document } = window;
  if (document.getElementById("remark42")) {
    insertScript("remark42-script", document.body, config);
  }
  return () => removeScript("remark42-script", document.body);
};

const recreateRemark42Instance = () => {
  if (!window) return;
  const remark42 = window.REMARK42;
  if (remark42) {
    remark42.destroy();
    remark42.createInstance(window.remark_config);
  }
};

interface iRemark42Config {
  theme: string;
  host: string;
  site_id: string;
  components: ["embed"];
}

interface iProps {
  remark_config: iRemark42Config;
}

function Remark42({ remark_config }: iProps) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [comment_enabled, setCommentEnabled] = useState(false);
  const loadCommentEnabled = useCallback(async () => {
    setLoading(true);
    const resp = await fetch(config.resource("/api/comment"));
    const { enabled } = await resp.json();
    setCommentEnabled(enabled);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCommentEnabled();
  }, [loadCommentEnabled]);

  useEffect(() => {
    if (loading) return;
    if (!comment_enabled) return;
    manageScript(remark_config);
  }, [loading, comment_enabled, remark_config, pathname]);

  useEffect(recreateRemark42Instance, [pathname]);
  if (!comment_enabled) return null;
  return (
    <div className="content-width mx-auto p-4 bg-white shadow-lg">
      <div id="remark42"></div>
    </div>
  );
}

export default Remark42;
