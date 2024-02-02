import React from "react";
import Link from "next/link";
import Button from "./Button";
import { THEME, breakpoints } from "@/constants";
import { useTheme } from "@/contexts/ThemeContext";
import { useSideNav } from "@/contexts/SideNavigationContext";

type MenuLink = {
  to: string;
  label: string;
  iconClass: string;
};

const SideNavigation = () => {
  const { theme, toggleTheme } = useTheme()!;
  const { isExpanded, setIsExpanded } = useSideNav();

  const onToggleSideMenuClicked = () => {
    if (window.innerWidth <= breakpoints.mobile) {
      return;
    }
    setIsExpanded(!isExpanded);
  };

  const onToggleThemeClicked = () => {
    toggleTheme();
  };

  const menuLinks: MenuLink[] = [
    {
      to: "/investments",
      label: "Investments",
      iconClass: "pi-money-bill",
    },
    {
      to: "/settings",
      label: "Settings",
      iconClass: "pi-cog",
    },
  ];

  return (
    <div
      className={`h-full min-h-[calc(100vh-32px)] invisible ease-in-out duration-300
      ${isExpanded ? "w-56 min-w-56" : "w-16 min-w-16"}`}
    >
      <nav
        className={`min-h-[calc(100vh-32px)] duration-300 ease-in-out overflow-hidden transform bg-theme-secondary border border-solid border-theme-border h-0 rounded-md fixed visible z-50 flex flex-col p-4 items-center text-theme-text
        ${isExpanded ? "w-56 min-w-56" : "w-16 min-w-16"}`}
      >
        <div className="flex flex-col gap-4 h-full items-start w-full">
          <div
            className={`flex items-center w-full ${
              isExpanded
                ? "flex-row flex-nowrap justify-between"
                : "flex-column flex-wrap justify-center"
            }`}
          >
            <Button
              text
              onClick={onToggleSideMenuClicked}
              className="p-0 border-none shadow-none text-theme-text font-bold mb-4 block h-fit"
            >
              <i className={`pi pi-bars text-lg`} />
            </Button>
            <Button
              text
              className="p-0 border-none shadow-none text-theme-text font-bold mb-4 block h-fit"
              onClick={onToggleThemeClicked}
            >
              <i
                className={`pi ${
                  theme === THEME.LIGHT ? "pi-sun" : "pi-moon"
                } text-lg`}
              />
            </Button>
          </div>
          {menuLinks.map((ml, index) => (
            <Link
              key={index}
              href={ml.to}
              className={`flex flex-row flex-nowrap font-bold w-full items-center ${
                isExpanded ? "justify-start" : "justify-center"
              }`}
            >
              <i
                className={`pi ${ml.iconClass} text-xl  h-fit leading-normal ${
                  isExpanded && "pr-4"
                }`}
              />
              {isExpanded && <span>{ml.label}</span>}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SideNavigation;
