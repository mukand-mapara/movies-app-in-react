import { MdHomeFilled } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";

export const navigation = [
  {
    label: "TV shows",
    href: "tv", 
    icon: <PiTelevisionFill />,
  },
  {
    label: "movies",
    href: "movies",
    icon: <BiSolidMoviePlay />,
  },
];

export const mobileNavigation = [
  {
    label: "home",
    href: "/",
    icon: <MdHomeFilled />,
  },
  ...navigation,
  {
    label: "search",
    href: "/search",
    icon: <IoSearchOutline />,
  },
];
