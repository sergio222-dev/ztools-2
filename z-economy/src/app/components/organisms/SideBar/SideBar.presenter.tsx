import { useState } from "react";
import {
    BsBank2,
    IoMdCash,
    RiBarChart2Fill,
} from "react-icons/all";

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
    handleSidebarButtonClick: (buttonName: SidebarActiveValues) => void;
    handleSidebarCollapsibleClick: () => void;
}
export function useSideBarPresenter(): [SideBarModel, object] {
    const [activeButton, setActiveButton] = useState<SidebarActiveValues>('Budget');
    const [toggleSidebar, setToggleSidebar] = useState(true);

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
            handleSidebarButtonClick,
            handleSidebarCollapsibleClick,
        },
        {}
    ]
}