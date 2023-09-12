import Image from "next/image";
import { RoundedAvatar } from "components/Avatar";

function Social({
  href,
  icon,
  alt = "",
  size = 48,
}: {
  alt?: string;
  href: string;
  icon: string;
  size?: number;
}) {
  return (
    <a href={href} rel="noreferrer">
      <Image src={icon} width={size} height={size} alt={alt}></Image>
    </a>
  );
}

const socials = [
  {
    href: "https://github.com/ezirmusitua",
    icon: "/icons/github.svg",
    alt: "ezirmusitua | Github",
    size: 24,
  },
  {
    href: "mailto:jferroal@gmail.com",
    icon: "/icons/envelope.svg",
    alt: "jferroal@gmail.com",
    size: 24,
  },
];

function Profile() {
  return (
    <section className="w-full md:w-[260px] h-fit pb-4">
      <div className="w-full h-full bg-white shadow-md py-4">
        <div className="w-full flex justify-center">
          <RoundedAvatar
            src="/assets/avatar.png"
            size={80}
            alt="ezirmusitua"
          ></RoundedAvatar>
        </div>
        <div className="pt-4">
          <div className="pb-2">
            <p className="font-bold mb-0 text-xl text-center">ezirmsuitua</p>
          </div>
          <div className="flex justify-center gap-4">
            {socials.map((social, index: number) => (
              <div key={index}>
                <Social {...social}></Social>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
