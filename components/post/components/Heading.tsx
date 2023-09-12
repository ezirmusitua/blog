import classnames from "classnames";
import Image from "next/image";
import React from "react";

interface iProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  id?: string;
  className?: string;
}
function Heading({ level, children, ...props }: iProps) {
  const elem = [
    <h1 {...props} key={props.id}>
      {children}
    </h1>,
    <h2 {...props} key={props.id}>
      {children}
    </h2>,
    <h3 {...props} key={props.id}>
      {children}
    </h3>,
    <h4 {...props} key={props.id}>
      {children}
    </h4>,
    <h5 {...props} key={props.id}>
      {children}
    </h5>,
    <h6 {...props} key={props.id}>
      {children}
    </h6>,
  ][level - 1];
  const icon_size = [32, 28, 24, 24, 24, 24][level - 1];
  const icon_className = classnames("absolute left-0", {
    "bottom-[0.25em]": level < 4,
    "bottom-[0.1em]": level >= 4,
  });
  return (
    <a href={`#${props.id}`}>
      <div className="relative pl-10">
        <div className={icon_className}>
          <Image
            src="/icons/hashtag.svg"
            width={icon_size}
            height={icon_size}
            alt="heading"
          ></Image>
        </div>
        {elem}
      </div>
    </a>
  );
}

export default Heading;
