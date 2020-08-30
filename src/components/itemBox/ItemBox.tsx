import React from 'react'
import { Card, Button, List, Avatar, Skeleton, Checkbox, Input } from 'antd';

import "./itemBox.less"

const fakeDataUrl = `http://localhost:3000/`
import { addData, getData } from '../../action/index'
// `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

interface initProps {
	name: String,
	state: Number
}
interface Item {
	id: Number,
	content: String,
	state: Number,
	orderId: String
}
interface initState {
		initLoading: boolean,
    loading: boolean,
    doingItems: Item[],
		doneItems: Item[],
		doingNum: 0,
		doneNum: 0
}

class ItemBox extends React.Component<initProps, initState> {
	constructor(props : initProps) {
		super(props);
		this.state = {
			initLoading: true,
			loading: false,
			doingItems: [],
			doneItems: [],
			doingNum: 0,
			doneNum: 0
		}
	}
	// readonly state: initState = {
  //   initLoading: true,
  //   loading: false,
  //   doingItems: [],
	// 	doneItems: [],
	// 	doingNum: 0,
	// 	doneNum: 0
  // };
	componentWillMount() {
		this.getHandle()
	}

	// 获取所有事项
	getHandle = ()=> {
		getData((res: any) => {
      this.setState({
        initLoading: false,
        doingItems: res.doingItems,
				doneItems: res.doneItems,
				doingNum: res.doingNum,
				doneNum: res.doneNum
			});
		}, "items");
	}

	// 删除事项
	deleteHandle = (id: Number, e: any) => {
		e.preventDefault()
		getData((res: any) => {
      this.setState({
        initLoading: false,
        doingItems: res.doingItems,
				doneItems: res.doneItems,
				doingNum: res.doingNum,
				doneNum: res.doneNum
      });
    }, 'deleteItem/'+id);
	}

	// 点击多选框, 更新状态
	updateState = (id: Number,  newOrderId: String, state: Number, e: any)=> {
		getData((res: any) => {
			console.log(res)
			this.setState({
				initLoading: false,
        doingItems: res.doingItems,
				doneItems: res.doneItems,
				doingNum: res.doingNum,
				doneNum: res.doneNum
			})
    }, 'updateState/'+id+'/'+newOrderId+'/'+state);
	}

	// 更新内容
	updateContent = (id: Number, state: Number, e:any) => {
		e.target.className="content-active"
		e.target.onkeydown = (event:any) => {
			if(event.keyCode == 13) {
				event.preventDefault()
				addData((res: any) => {
					this.setState({
						initLoading: false,
						doingItems: res.doingItems,
						doneItems: res.doneItems,
						doingNum: res.doingNum,
						doneNum: res.doneNum
					});
				},{'content': event.target.innerHTML}, "updateItem/"+id+'/'+state, this.getHandle);
				this.getHandle();
				event.target.className="content"
			}
		}
	}

	render() {
		const { initLoading, doingItems, doneItems, doingNum, doneNum, loading } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
        </div>
			) : null;
		const { state }= this.props;

		if(state == 0) {
			return (
			<Card title={this.props.name} extra={<Button type="primary" shape="circle">{doingNum}</Button>} style={{ width: "100%", marginBottom: "20px"}}>
					<List
						className="demo-loadmore-list"
						loading={initLoading}
						itemLayout="horizontal"
						loadMore={loadMore}
						dataSource={doingItems}
						renderItem={item => (
							<List.Item className="doinglistItem" actions={[<a key="list-loadmore-edit" onClick={this.deleteHandle.bind(this, item.id)}>删除</a>]}>
								<Skeleton avatar title={false} loading={false} active>
									<Checkbox onChange={this.updateState.bind(this, item.id, doneNum > 0? doneItems[doneNum-1].orderId : 'done0', item.state)} checked={Boolean(item.state)}></Checkbox>
									<div className="content" onBlur={(e)=>e.target.className="content"} onClick={this.updateContent.bind(this, item.id, item.state)} contentEditable>{item.content}</div>
								</Skeleton>
							</List.Item>
						)}
					/>
				</Card>
			)
		}
		return (
			<Card title={this.props.name} extra={<Button type="primary" shape="circle">{doneNum}</Button>} style={{ width: "100%", marginBottom: "20px"}}>
				<List
					className="demo-loadmore-list"
					loading={initLoading}
					itemLayout="horizontal"
					loadMore={loadMore}
					dataSource={doneItems}
					renderItem={item => (
						<List.Item className="donelistItem" actions={[<a key="list-loadmore-edit" href={'http://localhost:3000/deleteItem/'+item.id}>删除</a>]}>
							<Skeleton avatar title={false} loading={false} active>
								<Checkbox style={{marginRight: '5px'}} onChange={this.updateState.bind(this, item.id, doingNum > 0? doingItems[doingNum-1].orderId : 'doing0', item.state)} checked={Boolean(item.state)}></Checkbox>
								<div className="content" onBlur={(e)=>e.target.className="content"} onClick={this.updateContent.bind(this, item.id, item.state)} contentEditable>{item.content}</div>
								{/* <Input placeholder="hello world"></Input> */}
							</Skeleton>
						</List.Item>
					)}
				/>
			</Card>
		)
	}
}

export default ItemBox
