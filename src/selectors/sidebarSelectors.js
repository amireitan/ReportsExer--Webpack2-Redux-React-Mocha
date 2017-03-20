import {createSelector} from 'reselect';

const getData = (state) => state.data;
const getFilterText = (state) => state.textFilter;
const getIsAsc = (state) => state.isAsc;

const sortType = {
    asc: (a, b) => a.updated - b.updated,
    des: (a, b) => b.updated - a.updated
};

export const filterSort =  createSelector(
	[getData, getFilterText, getIsAsc],
	(data, filterText, isAsc) => {
		const sortFunc = isAsc ?  sortType.asc : sortType.des;
		return data.filter(item => item.name.toLowerCase().includes(filterText))
               .sort(sortFunc);
	}
);
	
