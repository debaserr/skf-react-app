import React, {useEffect, useState} from 'react';
import {Layout, message} from 'antd';
import SideMenu, {MenuItem} from './components/SideMenu';
import './App.css';

const {Header, Sider, Content} = Layout;

function App() {
  const [content, setContent] = useState<string>('Nothing selected');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetch('https://run.mocky.io/v3/2f6c8b3c-6e46-4f32-8ab5-ff84ef41c3d6').then(async resp => {
      const {data, errors} = await resp.json();
      if (resp.ok) {
        setMenuItems(data);
      } else {
        message.error('Could not fetch menu items from API');
        console.log(errors);
      }
    }).catch(err => {
      message.error('Could not fetch menu items from API');
      console.log(err);
    });
  }, []);

  return (
    <Layout style={{height:'100vh'}}>
      <Header className='header'>
        <h1>My app</h1>
      </Header>
      <Layout>
        <Sider width={200} className='site-layout-background'>
          <SideMenu items={menuItems} onSelect={(menuItem: string) => setContent(menuItem)} />
        </Sider>
        <Layout style={{padding: '0 24px 24px'}}>
          <Content
            className='site-layout-background'
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {content}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
