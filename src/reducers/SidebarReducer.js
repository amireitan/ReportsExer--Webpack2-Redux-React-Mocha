import {assign} from 'lodash';
import {
	PRE_FETCH_SIDEBARDATA, 
	FETCH_SIDEBARDATA_SUCCESS, 
	FETCH_SIDEBARDATA_ERROR,
	FILTER_REPORTS,
	SORT_REPORTS,
	CLOSE_SIDEBAR,
	OPEN_SIDEBAR
} from '../actions/SidebarActions'

const InitialState = {
	isRender: false,
	data: [],
	title: 'Reports',
	textFilter:'',
	isAsc: false,
	isWaiting: false,
	isRefresh: false,
	isError: false,
	errorMessage:''
}

export default function (state = InitialState, action) {
	switch (action.type) {
		case PRE_FETCH_SIDEBARDATA:
			return assign({}, state, {
				isRender: true,
				isWaiting: true,
				isError: false
			});
		case FETCH_SIDEBARDATA_SUCCESS:
			return assign({}, state, {
				data: action.payload || [],
				isWaiting: false,
				isError: false,
				errorMessage:''
			});
		case FETCH_SIDEBARDATA_ERROR:
			return assign({}, state, {
				data: [],
				errorMessage: action.payload,
				isWaiting: false,
				isError: true
			});
		case FILTER_REPORTS: 
			return assign({}, state, {textFilter: action.payload});
		case SORT_REPORTS: 
			return assign({}, state, {isAsc: action.payload});
		case CLOSE_SIDEBAR:
			return assign({}, state, {isRender: false});
		case OPEN_SIDEBAR:
			return assign({}, state, {isRender: true});
		default:
			return state
	}
}