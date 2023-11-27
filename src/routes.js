import React from "react";
import { GiVideoConference } from "react-icons/gi";
// Admin Imports
import MainDashboard from "views/admin/default";
import { MdQuestionAnswer } from "react-icons/md";
import NFTMarketplace from "views/admin/marketplace";
import Faq from "views/admin/faq";
import Seminar from "views/admin/seminar";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },

  {
    name: "FAQ",
    layout: "/admin",
    path: "faqs",
    icon: <MdQuestionAnswer className="h-6 w-6" />,
    component: <Faq />,
    secondary: true,
  },
  {
    name: "Seminars",
    layout: "/admin",
    path: "seminars",
    icon: <GiVideoConference className="h-6 w-6" />,
    component: <Seminar />,
    secondary: true,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "rtl",
    icon: <MdHome className="h-6 w-6" />,
    component: <RTLDefault />,
  },
];
export default routes;
