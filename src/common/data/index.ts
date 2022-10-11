import {
  IconBrandAppgallery,
  IconHome2,
  IconSettings,
  IconTriangleSquareCircle,
  IconWorldWww,
} from "@tabler/icons";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
type Menu = {
  label: string;
  icon: any;
  url: string;
};

export const menus: Menu[] = [
  {
    label: "Home",
    icon: IconHome2,
    url: "/dashboard",
  },
  {
    label: "Website",
    icon: IconWorldWww,
    url: "/",
  },
  {
    label: "Category",
    icon: AiOutlineUsergroupDelete,
    url: "/dashboard/category",
  },
  {
    label: "Files",
    icon: IconBrandAppgallery,
    url: "/dashboard/files",
  },
  {
    label: "Transactions",
    icon: IconTriangleSquareCircle,
    url: "/dashboard/transaction",
  },
  {
    label: "Settings",
    icon: IconSettings,
    url: "/dashboard/settings",
  },
];
