// import Image from "next/image";
import md5 from "md5";
import classnames from "classnames";

interface iProps {
  src: string;
  size: number;
  alt?: string;
  className?: string;
}

function Avatar({ src, size, alt = "", className = "" }: iProps) {
  const _className = classnames(className, "relative");
  return (
    <div className={_className} style={{ width: size, height: size }}>
      <img
        alt={alt}
        className="object-contain object-center"
        src={src}
        width={size}
        height={size}
        sizes={`${size}px`}
      ></img>
    </div>
  );
}

export function RoundedAvatar({ src, size, alt, className = "" }: iProps) {
  const _className = classnames(
    className,
    "rounded-full overflow-hidden border-2 border-[var(--border-color)]"
  );
  return (
    <Avatar src={src} size={size} alt={alt} className={_className}></Avatar>
  );
}

interface iGravatarProps {
  email?: string;
  size?: number;
}

export function Gravatar({ email, size = 240 }: iGravatarProps) {
  const hash = email
    ? md5(email.trim().toLowerCase())
    : "00000000000000000000000000000000";

  const src = `https://www.gravatar.com/avatar/${hash}.jpg?s=${size}`;
  const alt = `Avatar for ${email}`;
  return <Avatar alt={alt} src={src} size={size}></Avatar>;
}

export default Avatar;
