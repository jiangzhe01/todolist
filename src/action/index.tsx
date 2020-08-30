import reqwest from 'reqwest'
import { useCallback } from 'react';

const fakeDataUrl = `http://localhost:3000/`

export const getData = (callback: any, path: String, actionFun=()=>{}) => {
	reqwest({
		url: fakeDataUrl+path,
		type: 'json',
		method: 'get',
		contentType: 'application/json',
		success: (res: any) => {
			callback(res);
		},
	});
};
export const addData = (callback: any, data:any, path: String, actionFun: any) =>{
	reqwest({
		url: fakeDataUrl+path,
		type: 'json',
		method: 'post',
		data: data,
		error: function (err: any) { },
		success: function (res: any) {
			callback(res);
			actionFun();
    }
})
}
