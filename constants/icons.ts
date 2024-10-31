import Bookmark from "../assets/icons/bookmark.png";
import Home from "../assets/icons/home.png";
import Plus from "../assets/icons/plus.png";
import Profile from "../assets/icons/profile.png";
import LeftArrow from "../assets/icons/left-arrow.png";
import Menu from "../assets/icons/menu.png";
import Search from "../assets/icons/search.png";
import Upload from "../assets/icons/upload.png";
import RightArrow from "../assets/icons/right-arrow.png";
import Logout from "../assets/icons/logout.png";
import EyeHide from "../assets/icons/eye-hide.png";
import Eye from "../assets/icons/eye.png";
import Play from "../assets/icons/play.png";
import { ImageSourcePropType } from "react-native";

const createIconsMap = <K extends string>(
  map: Record<K, ImageSourcePropType>
) => map;

const Icons = createIconsMap({
  Play,
  Bookmark,
  Home,
  Plus,
  Profile,
  LeftArrow,
  Menu,
  Search,
  Upload,
  RightArrow,
  Logout,
  EyeHide,
  Eye,
});

export type TIcon = keyof typeof Icons;

export default Icons;
