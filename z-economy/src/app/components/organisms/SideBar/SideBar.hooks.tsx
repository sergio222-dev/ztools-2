import { useState } from 'react';
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

function toKebabCase(buttonName: SidebarActiveValues) {
  return buttonName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}
export function useSideBarHooks(): [SideBarModel, SideBarOperators] {
  // MODEL
  const [activeButton, setActiveButton] = useState<SidebarActiveValues>('Budget');
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const navigate = useNavigate();

  // OPERATORS
  const handleSidebarButtonClick = (buttonName: SidebarActiveValues) => {
    setActiveButton(buttonName);
    if (buttonName === 'Budget') {
      navigate('/');
    } else {
      navigate(`/${toKebabCase(buttonName)}`);
    }
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
