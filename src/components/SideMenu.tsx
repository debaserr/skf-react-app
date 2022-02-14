import React from 'react';
import {Menu} from 'antd';

const {SubMenu} = Menu;

export type MenuItem = {
  name: string;
  children?: MenuItem[];
}

export type SideMenuProps = {
  items: MenuItem[];
  onSelect: (menuItem: string) => void;
}

function getMenuItems(items: MenuItem[], onSelect: (menuItem: string) => void) {
  return <>
    {
      items.map((item) => {
        if (item.children) {
          return <SubMenu key={item.name} title={item.name}>
            {getMenuItems(item.children, onSelect)}
          </SubMenu>;
        }
        return <Menu.Item key={item.name} onClick={() => onSelect(item.name)}>{item.name}</Menu.Item>;
      })
    }
  </>;
}

function SideMenu({items, onSelect}: SideMenuProps) {
  return <Menu
    mode='inline'
    style={{ height: '100%', borderRight: 0 }}
  >
    {getMenuItems(items, onSelect)}
  </Menu>;
}

export default SideMenu;
