"use client";
import classnames from "classnames";
import React, { useMemo, useState } from "react";
import Image from "next/image";

interface iProps {
  children: React.ReactNode;
  className: string;
}

function TOC(props: iProps) {
  const [collapsed, set_collapsed] = useState(false);
  const className = useMemo(
    () =>
      classnames(
        "z-10 sm:fixed sm:right-4 sm:top-1/2 sm:-translate-y-1/2 none sm:block max-h-[800px] overflow-auto",
        "bg-white shadow-md border-r-[4px] border-[#1abc9c]",
        "transition-all duration-300",
        {
          "pl-[1.5em] pr-[2em] py-[1.5em]": !collapsed,
          "w-[36px] h-[32px]": collapsed,
        },
        props.className
      ),
    [collapsed, props.className]
  );
  return (
    <nav className={className}>
      {!collapsed && props.children}
      <button
        className="absolute top-[4px] right-[4px] hidden md:block"
        onClick={() => set_collapsed(!collapsed)}
      >
        <Image
          alt="toggle toc"
          src="/icons/list-bullet.svg"
          height={24}
          width={24}
        ></Image>
      </button>
    </nav>
  );
}

export default TOC;
