import { useState } from 'react';
import { BsBank2, IoMdCash, RiBarChart2Fill } from 'react-icons/all';
import { useNavigate } from 'react-router';
import { supabase } from '../../forms/Auth/AuthForm';
import { Signal, useSignal } from '@preact/signals-react';

// type SidebarActiveValues = 'SubCategory' | 'Reports' | 'All Accounts';

// const SIDEBAR_BUTTON_NAMES: Array<SidebarActiveValues> = ['SubCategory', 'Reports', 'All Accounts'];
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
  modalIsOpen: Signal<boolean>;
}

interface SideBarOperators {
  handleSidebarButtonClick: (buttonRoute: string) => void;
  handleSidebarCollapsibleClick: () => void;
  handleLogout: () => void;
  handleAddAccount: () => void;
}
export function useSideBarHooks(): [SideBarModel, SideBarOperators] {
  // MODEL
  // STATES
  const [activeButton, setActiveButton] = useState<string>(location.pathname);
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const modalIsOpen = useSignal(false);

  // SERVICES
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

  const handleAddAccount = () => {
    modalIsOpen.value = true;
  };

  return [
    {
      SIDEBAR_BUTTONS,
      activeButton,
      toggleSidebar,
      modalIsOpen,
    },
    {
      handleSidebarButtonClick,
      handleSidebarCollapsibleClick,
      handleLogout,
      handleAddAccount,
    },
  ];
}
