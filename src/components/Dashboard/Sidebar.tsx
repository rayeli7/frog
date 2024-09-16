/**
 * This code was generated by Builder.io.
 */

"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import {
  MdHouse,
  MdOutlineHouse,
  MdSettings,
  MdOutlineSettings,
} from "react-icons/md";
import { FaBars } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MenuItem {
  iconA: IconType;
  iconB: IconType;
  label: string;
  isActive?: boolean;
  link: string;
}

const menuItems: MenuItem[] = [
  {
    iconA: MdHouse,
    iconB: MdOutlineHouse,
    label: "Dashboard",
    isActive: true,
    link: "/dashboard",
  },
  {
    iconA: MdSettings,
    iconB: MdOutlineSettings,
    label: "Settings",
    isActive: false,
    link: "/dashboard/settings",
  },
];

const Sidebar: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState(menuItems[0]); // State to keep track of selected item

  // Function to handle link click
  const handleClick = (item: MenuItem) => {
    setSelectedItem(item); // Update state with the selected item
    menuItems.forEach((i) => (i.isActive = false)); // Reset all other items to inactive
    item.isActive = true;
  };

  // Render the menu items
  return (
    <nav className="absolute flex-col justify-between w-64 h-full bg-transparent text-white ">
      {/* Dropdown Icon for Mobile */}
      <div className="block md:hidden z-10">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <FaBars className="text-2xl" color="#422006" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            {menuItems.map((item, index) => (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem key={index}>
                  <Link href={item.link}>{item.label}</Link>
                </DropdownMenuItem>
              </>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Menu for Web */}
      <div className="flex flex-col self-start h-full mt-3.5 text-lg font-medium whitespace-nowrap max-md:hidden">
        {menuItems.map((item, index) => (
          <Link
            href={item.link}
            key={index}
            onClick={() => {
              handleClick(item); // Update state
              selectedItem;
            }}
          >
            <div
              key={index}
              className={`flex gap-7 items-center self-start ${
                item.isActive ? "text-yellow-300" : "text-yellow-950"
              } ${index > 0 ? "mt-10" : ""}`}
            >
              {item.isActive && (
                <div className="flex shrink-0 self-stretch w-1.5 bg-yellow-300 rounded-none h-[60px]" />
              )}
              {item.isActive ? (
                <item.iconA size={48} color="#fde047" />
              ) : (
                <item.iconB size={24} color="#422006" />
              )}
              <div className="self-stretch my-auto">{item.label}</div>
            </div>
          </Link>
        ))}
      </div>
      {/* Footer section */}
    </nav>
  );
};

export default Sidebar;
