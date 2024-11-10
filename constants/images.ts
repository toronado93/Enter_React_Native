import Profile from "../assets/images/profile.png";
import Thumbnail from "../assets/images/thumbnail.png";
import Cards from "../assets/images/cards.png";
import Path from "../assets/images/path.png";
import Logo from "../assets/images/logo.png";
import LogoSmall from "../assets/images/logo-small.png";
import Empty from "../assets/images/empty.png";
import { ImageURISource } from "react-native";

const createImageMap = <K extends string>(map: Record<K, ImageURISource>) =>
  map;

const Images = createImageMap({
  Profile,
  Thumbnail,
  Cards,
  Path,
  Logo,
  LogoSmall,
  Empty,
});

export default Images;
