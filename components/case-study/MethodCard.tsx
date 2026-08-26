import Image from "next/image";

// One of the four research method cards under "My Approach" (User Tracking,
// User interviews, Benchmarking, Survey). Repeats 4 times, so shared.
type MethodCardProps = {
  title: string;
  description: string;
  logos?: { src: string; alt: string }[];
  avatars?: { src: string; alt: string }[];
  icons?: { src: string; alt: string }[];
};

export function MethodCard({ title, description, logos, avatars, icons }: MethodCardProps) {
  return (
    <div className="flex h-[380px] flex-col justify-between gap-10 rounded-[40px] bg-portfolio-grey-50 p-8 sm:p-10">
      <div className="flex h-[52px] items-center">
        {logos?.map((logo, i) => (
          <div
            key={i}
            className={`relative size-[52px] shrink-0 overflow-hidden rounded-xl bg-portfolio-grey-100 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] ${i > 0 ? "-ml-3" : ""}`}
          >
            <Image src={logo.src} alt={logo.alt} fill className="object-cover" />
          </div>
        ))}
        {avatars?.map((avatar, i) => (
          <div
            key={i}
            className={`relative size-[52px] shrink-0 overflow-hidden rounded-full border-2 border-white bg-portfolio-grey-100 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] ${i > 0 ? "-ml-3" : ""}`}
          >
            <Image src={avatar.src} alt={avatar.alt} fill className="object-cover" />
          </div>
        ))}
        {icons?.map((icon, i) => (
          <div
            key={i}
            className={`flex size-[52px] shrink-0 items-center justify-center rounded-full shadow-[0px_8px_24px_0px_rgba(0,0,0,0.12)] ${
              i === 0 ? "bg-faircado-green-500" : "bg-faircado-pink-600"
            }`}
          >
            <Image src={icon.src} alt={icon.alt} width={28} height={28} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <p className="whitespace-nowrap font-manrope font-bold text-[22px] leading-[32px] tracking-[-0.5px] text-portfolio-grey-900 lg:text-[24px]">
          {title}
        </p>
        <p className="font-manrope text-[16px] leading-[26px] text-portfolio-grey-900">{description}</p>
      </div>
    </div>
  );
}
