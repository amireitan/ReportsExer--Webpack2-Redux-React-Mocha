import fetch from 'isomorphic-fetch';

//Constants
export const PRE_FETCH_SIDEBARDATA     = 'PRE_FETCH_SIDEBARDATA';
export const FETCH_SIDEBARDATA_SUCCESS = 'FETCH_SIDEBARDATA_SUCCESS';
export const FETCH_SIDEBARDATA_ERROR   = 'FETCH_SIDEBARDATA_ERROR';
export const FILTER_REPORTS            = 'FILTER_REPORTS';
export const SORT_REPORTS              = 'SORT_REPORTS';
export const CLOSE_SIDEBAR             = 'CLOSE_SIDEBAR';
export const OPEN_SIDEBAR              = 'OPEN_SIDEBAR';

////////// Action Creators
export function filterReportsList(textFilter) {
    return {type: FILTER_REPORTS, payload: textFilter};
}

export function sortReportsList(isAsc) {
    return {type: SORT_REPORTS, payload: isAsc};
}

export function preFetchSidebarData() {
    return {type: PRE_FETCH_SIDEBARDATA};
} 

export function fetchDataSuccess(data) {
    return {type: FETCH_SIDEBARDATA_SUCCESS, payload: data};
}

export function fetchDataFail(errorMessage) {
    return {type: FETCH_SIDEBARDATA_ERROR, payload: errorMessage};
}

export function closeSidebar() {
    return {type: CLOSE_SIDEBAR};
}

export function openSidebar() {
    return {type: OPEN_SIDEBAR};
}

////////// Functions
export const AddTimeTextToItems = (data) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov', 'Dec'];
    const getTimeFormat = (time) => time < 10 ? `0${time}` : time;

    return data.map( item => {
        const updatedTime = new Date(item.updated);

        item.updatedText = {
            date: `${months[updatedTime.getMonth()]} ${getTimeFormat(updatedTime.getDay())}`,
            time: `${updatedTime.getHours()}:${getTimeFormat(updatedTime.getMinutes())}`
        }
        return item;
    });
}

export function fetchSidebarData() {
    return dispatch => {
        dispatch(preFetchSidebarData());
        return fetch('/localSource/sidebar.json')
            .then(response => response.json())
            .then(AddTimeTextToItems)
            .then(data => dispatch(fetchDataSuccess(data)))
            .catch((err) => dispatch(fetchDataFail("Error while fetching data")));
    }
}

export function shouldFetchSidebarData(isRefresh) {
    return (dispatch, getState) => {
        if (getState().sidebarData.data.length === 0 || isRefresh) {
            return dispatch(fetchSidebarData());
        }
    }
}