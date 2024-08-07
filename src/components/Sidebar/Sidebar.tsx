import { FC, ReactElement } from "react";
import { SidebarProps } from "./types";

const Sidebar: FC<SidebarProps> = ({ logo, userProfile }): ReactElement => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo.src} alt={logo.alt} />
      </div>
      <div className="user-profile">
        <img src={userProfile.src} alt={userProfile.alt} />
      </div>
    </aside>
  );
};

export { Sidebar };
