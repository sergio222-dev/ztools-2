import { useEffect, useState } from 'react';
import { BsBank2, IoMdCash, RiBarChart2Fill } from 'react-icons/all';
import { useNavigate } from 'react-router';

type SidebarActiveValues = 'Budget' | 'Reports' | 'All Accounts';

const SIDEBAR_BUTTON_NAMES: Array<SidebarActiveValues> = ['Budget', 'Reports', 'All Accounts'];

const SIDEBAR_BUTTON_ICONS = [
  <IoMdCash key="icon1" />,
  <RiBarChart2Fill key="icon2" />,
  <BsBank2 key="icon3" />,
];

interface SideBarModel {
  SIDEBAR_BUTTON_NAMES: Array<SidebarActiveValues>;
  SIDEBAR_BUTTON_ICONS: Array<JSX.Element>;
  activeButton: SidebarActiveValues;
  toggleSidebar: boolean;
}

interface SideBarOperators {
  handleSidebarButtonClick: (buttonName: SidebarActiveValues) => void;
  handleSidebarCollapsibleClick: () => void;
}
export function useSideBarPresenter(): [SideBarModel, SideBarOperators] {
  // MODEL

  const [activeButton, setActiveButton] = useState<SidebarActiveValues>('Budget');
  const [toggleSidebar, setToggleSidebar] = useState(true);

  // OPERATORS
  const handleSidebarButtonClick = (buttonName: SidebarActiveValues) => {
    setActiveButton(buttonName);
  };

  const handleSidebarCollapsibleClick = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return [
    {
      SIDEBAR_BUTTON_NAMES,
      SIDEBAR_BUTTON_ICONS,
      activeButton,
      toggleSidebar,
    },
    {
      handleSidebarButtonClick,
      handleSidebarCollapsibleClick,
    },
  ];
}
