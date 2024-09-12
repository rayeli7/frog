/**
 * This code was generated by Builder.io.
 */
import React from "react";
import Image from "next/image";

interface MenuItem {
  icon: string;
  label: string;
  isActive?: boolean;
}

const menuItems: MenuItem[] = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c389f5d9f1ee0b7d437e24057bbc663a94ea2f15ec7fde0f4864015eeda677d?apiKey=65c59f804f0842d29a4e67cb1a2841cf&",
    label: "Dashboard",
    isActive: true,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4740b747b9a95a487146542d7f7ad631aa710c9dbbfb39251cec533c4f0aa7f8?apiKey=65c59f804f0842d29a4e67cb1a2841cf&",
    label: "Transactions",
    isActive: false,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/fe68b5bfdc4cb5765d2f4d6f5bba84978db60968d751ca0d096014d897bc95d2?apiKey=65c59f804f0842d29a4e67cb1a2841cf&",
    label: "Accounts",
    isActive: false,
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/270efbcbbe3fe5831e90aceca323438437e2721b9f83d90e67a3dcdefe61175f?apiKey=65c59f804f0842d29a4e67cb1a2841cf&",
    label: "Setting",
    isActive: false,
  },
];

const Sidebar: React.FC = () => {
  return (
    <nav className="flex flex-col self-start mt-3.5 text-lg font-medium whitespace-nowrap">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`flex gap-7 items-center self-start ${
            item.isActive ? "text-blue-600" : "text-zinc-400"
          } ${index > 0 ? "mt-10" : ""}`}
        >
          {item.isActive && (
            <div className="flex shrink-0 self-stretch w-1.5 bg-blue-600 rounded-none h-[60px]" />
          )}
          <Image
            loading="lazy"
            src={item.icon}
            width={25}
            height={25}
            alt=""
            className="object-contain shrink-0 self-stretch my-auto aspect-square w-[25px]"
          />
          <div className="self-stretch my-auto">{item.label}</div>
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;
