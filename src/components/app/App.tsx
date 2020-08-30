import React from 'react'

import { Layout, Menu, Input } from 'antd';
import ItemBox from '../itemBox/ItemBox'

import './app.less'
import {addData} from '../../action/index'

const { Header, Content, Footer } = Layout;

interface Item {
	id: Number,
	content: String,
	state: Number,
	orderId: String
}

interface initState {
	orderId: Number,
	initLoading: boolean,
	loading: boolean,
	doingItems: Item[],
	doneItems: Item[],
	doingNum: 0,
	doneNum: 0
}
interface initProps {}


class App extends React.Component<initProps, initState>{
	private itemRef = React.createRef<ItemBox>();
	readonly state: initState = {
		orderId: 0,
		initLoading: true,
		loading: false,
    doingItems: [],
		doneItems: [],
		doingNum: 0,
		doneNum: 0
	}

	// 添加事项
	addItem = (e: any) => {
		e.target.onkeydown = (event: any) =>{
			if(event.keyCode == 13) {
				event.preventDefault()
				if(this.itemRef.current) {
					addData((res: any) => {
						this.setState({
							initLoading: false,
							doingItems: res.doingItems,
							doneItems: res.doneItems,
							doingNum: res.doingNum,
							doneNum: res.doneNum
						});
					},{'content': event.target.value}, "item/"+'doing'+this.itemRef.current.state.doingNum, this.itemRef.current.getHandle);
					this.itemRef.current.getHandle();
				}

			}

		}
	}

	render() {
		return (
			<Layout className="layout" style={{height: "100%"}}>
        <Header>
					<div className="headerSection">
						<label htmlFor="addItem" className="title">ToDoList</label><Input id="addItem" className="inputItem" placeholder="添加 ToDo" onChange={this.addItem} />
					</div>
        </Header>
        <Content style={{ padding: '0 50px', flex: "1"}}>
          <div className="site-layout-content">
						<ItemBox name="正在进行" state={0}  ref={this.itemRef} ></ItemBox>
						<ItemBox name="已经完成" state={1}></ItemBox>
					</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
		)
	}
}

export default App
