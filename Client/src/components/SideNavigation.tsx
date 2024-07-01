import { useToast } from "@/contexts/ToastContext";
import { useSideNav } from "@/contexts/SideNavigationContext";
import { COOKIE_NAMES, MODULES, breakpoints } from "@/shared/constants";
import Cookies from "js-cookie";
import Link from "next/link";
import useAccount, { Role } from "@/shared/react-query-hooks/useAccount";
import { useEffect, useState } from "react";

type MenuLink = {
  to: string;
  label: string;
  iconClass: string;
};

const SideNavigation = () => {
  const { data: user } = useAccount();
  const { isExpanded, setIsExpanded } = useSideNav();
  const [menuLinks, setMenuLinks] = useState<MenuLink[]>([]);
  const toast = useToast();

  const onToggleSideMenuClicked = () => {
    if (window.innerWidth <= breakpoints.mobile) {
      return;
    }
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const initialMenuLinks = [
      {
        to: MODULES.SHOP.PATH,
        label: "Shop",
        iconClass: "pi-shop",
      },

      {
        to: MODULES.PLAYLISTS.CREATE,
        label: "Create playlist",
        iconClass: "pi-youtube",
      },
    ];
    if (user?.Role === Role.ADMINISTRATOR) {
      initialMenuLinks.push({
        to: MODULES.MP3.PATH,
        label: "Add new mp3",
        iconClass: "pi-plus",
      });
    }

    if (user?.Role === Role.USER) {
      initialMenuLinks.push({
        to: MODULES.SHOPPING_CART.PATH,
        label: "Checkout",
        iconClass: "pi-shopping-cart",
      });
    }

    setMenuLinks(initialMenuLinks);
  }, [user]);

  const onLogoutClicked = () => {
    Cookies.remove(COOKIE_NAMES.AUTH_TOKEN, { path: "/" });
    toast.success("Logging out...");
    location.reload();
  };

  return (
    <div
      className={`h-[calc(90%)] min-h-[calc(90vh-32px)] invisible ease-in-out duration-300
      ${isExpanded ? "w-56 min-w-56" : "w-16 min-w-16"}`}
    >
      <nav
        className={`min-h-[calc(90vh-32px)] ease-in-out duration-300 overflow-hidden transform border border-solid border-pink h-0 rounded-md fixed visible z-50 flex flex-col p-4 items-center justify-between text-theme-text
        ${isExpanded ? "w-56 min-w-56" : "w-16 min-w-16"}`}
      >
        <div className="flex flex-col gap-4 h-full items-start w-full">
          <div
            className={`flex cursor-pointer items-center w-full mb-4 ${
              isExpanded
                ? "flex-row flex-nowrap justify-between"
                : "flex-column flex-wrap justify-center"
            }`}
            onClick={onToggleSideMenuClicked}
          >
            <i className="pi pi-bars text-lg" />
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
              {isExpanded && (
                <span className="text-nowrap leading-5">{ml.label}</span>
              )}
            </Link>
          ))}
        </div>
        <div
          onClick={onLogoutClicked}
          className={`w-full flex font-bold flex-nowrap overflow-hidden cursor-pointer ${
            isExpanded ? "flex-row" : "flex-column justify-center"
          }`}
        >
          <i
            className={`pi ${
              isExpanded && "pr-4"
            } text-lg pi-sign-out !leading-[23px]`}
          />
          {isExpanded && <span className="text-nowrap">Logout</span>}
        </div>
      </nav>
    </div>
  );
};

export default SideNavigation;
