import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

type Props = {
  type: string;
  title: string;
  message: string;
  link: string;
};

export default function Notification({ type, title, message, link }: Props) {
  const messageWithoutLink = (
    <div className="inline font-inter text-[12px]">{message}</div>
  );

  const messageWithLink = (
    <Link href={link}>
      <a target="blank" className="inline font-inter text-[12px]">
        <span className="mr-2">{message}</span>
        <div className="flex items-center mt-2 ">
          <span className="mr-2">Check transaction:</span>
          <Image
            src="/images/goto.svg"
            alt="go to"
            placeholder="blur"
            blurDataURL="/images/goto.svg"
            width={12}
            height={12}
          />
        </div>
      </a>
    </Link>
  );

  const container = (
    <div className="px-2 font-futuraPT space-y-1">
      <div className="text-light text-[18px]">{title}</div>
      <div className="text-light/[48%] text-[16px]">
        {link ? messageWithLink : messageWithoutLink}
      </div>
    </div>
  );

  switch (type) {
    case "success":
      return toast.success(container);
    case "error":
      return toast.error(container);
    default:
      return toast(container);
  }
}
