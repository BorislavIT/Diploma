import { useToast } from "@/contexts/ToastContext";
import { useSideNav } from "@/contexts/SideNavigationContext";
import { COOKIE_NAMES, MODULES, breakpoints } from "@/shared/constants";
import Cookies from "js-cookie";
import Link from "next/link";

type MenuLink = {
  to: string;
  label: string;
  iconClass: string;
};

const SideNavigation = () => {
  const { isExpanded, setIsExpanded } = useSideNav();
  const toast = useToast();

  const onToggleSideMenuClicked = () => {
    if (window.innerWidth <= breakpoints.mobile) {
      return;
    }
    setIsExpanded(!isExpanded);
  };

  const menuLinks: MenuLink[] = [
    {
      to: MODULES.SHOP.PATH,
      label: "Shop",
      iconClass: "pi-shopping-cart",
    },
    {
      to: MODULES.ORDERS.PATH,
      label: "Orders",
      iconClass: "pi-book",
    },
  ];

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
            className={`flex items-center w-full mb-4 ${
              isExpanded
                ? "flex-row flex-nowrap justify-between"
                : "flex-column flex-wrap justify-center"
            }`}
          >
            <i
              className="pi pi-bars text-lg cursor-pointer"
              onClick={onToggleSideMenuClicked}
            />
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
              {isExpanded && <span className="text-nowrap">{ml.label}</span>}
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
