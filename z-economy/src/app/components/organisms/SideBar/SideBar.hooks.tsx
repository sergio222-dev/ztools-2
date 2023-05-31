import { useState } from 'react';
import { BsBank2, IoMdCash, RiBarChart2Fill } from 'react-icons/all';
import { useNavigate } from 'react-router';
import { supabase } from '../../forms/Auth/Auth';

// type SidebarActiveValues = 'Budget' | 'Reports' | 'All Accounts';

// const SIDEBAR_BUTTON_NAMES: Array<SidebarActiveValues> = ['Budget', 'Reports', 'All Accounts'];
//
// const SIDEBAR_BUTTON_ROUTES: Array<SidebarRoutes> = ['/', '/reports', '/all-accounts'];

const SIDEBAR_BUTTONS = [
  {
    name: 'Budget',
    route: '/',
    icon: <IoMdCash key="icon1" />,
  },
  {
    name: 'Reports',
    route: '/reports',
    icon: <RiBarChart2Fill key="icon2" />,
  },
  {
    name: 'All Accounts',
    route: '/all-accounts',
    icon: <BsBank2 key="icon3" />,
  },
];

interface SideBarModel {
  SIDEBAR_BUTTONS: Array<{
    name: string;
    route: string;
    icon: JSX.Element;
  }>;
  activeButton: string;
  toggleSidebar: boolean;
}

interface SideBarOperators {
  handleSidebarButtonClick: (buttonRoute: string) => void;
  handleSidebarCollapsibleClick: () => void;
  handleLogout: () => void;
}
export function useSideBarHooks(): [SideBarModel, SideBarOperators] {
  // MODEL
  const [activeButton, setActiveButton] = useState<string>(location.pathname);
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const navigate = useNavigate();

  const handleSidebarButtonClick = (buttonRoute: string) => {
    navigate(buttonRoute);
    setActiveButton(buttonRoute);
  };

  const handleSidebarCollapsibleClick = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return alert(error.message);
    navigate('/login');
  };

  return [
    {
      SIDEBAR_BUTTONS,
      activeButton,
      toggleSidebar,
    },
    {
      handleSidebarButtonClick,
      handleSidebarCollapsibleClick,
      handleLogout,
    },
  ];
}
