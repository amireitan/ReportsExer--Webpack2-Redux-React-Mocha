import expect from 'expect';
import sidebarReducer from './SidebarReducer';
import * as actions from '../actions/SidebarActions';

describe('sidebar reducer', () => {
    
    const reportsArr = [
    {
        "id": 437,
        "name": "My first jmeter test",
        "created": 1437290589,
        "updated": 1437386204,
        "location": "us-central1-a",
        "type": "jmeter"
    },
    {
        "id": 441,
        "name": "some test",
        "created": 1437316436,
        "updated": 1437386115,
        "location": "us-central1-a",
        "type": "http"
    }];

    const initialState = {
        isRender: true,
        data: [],
        title: 'Reports',
        textFilter:'',
        isAsc: false,
        isWaiting: true,
        isRefresh: false,
        isError: false,
        errorMessage: ''
    };

    it('should add reports data when passed FETCH_SIDEBARDATA_SUCCESS', () => {

        const action   = actions.fetchDataSuccess(reportsArr);
        const newState = sidebarReducer(initialState, action);

        //expect terms
        expect(newState.data.length).toEqual(2);
        expect(newState.isWaiting).toEqual(false);
        expect(newState.isError).toEqual(false);
    });

    it('should set isAsc to true', () => {
        const action = actions.sortReportsList(true);
        const newState = sidebarReducer(initialState, action);

        //expect terms
        expect(newState.isAsc).toEqual(true);
    });

    it('should set isRender to false when closeSidebar action is fired', () => {
        const action = actions.closeSidebar();
        const newState = sidebarReducer(initialState, action);

        //expect terms
        expect(newState.isRender).toEqual(false);
    });

    it('should set isRender to true when openSidebar action is fired', () => {
        const action = actions.openSidebar();
        const newState = sidebarReducer(initialState, action);

        //expect terms
        expect(newState.isRender).toEqual(true);
    });

    it('should set the textFilter according to action filterReportsList payload', () => {
        const textFilter = "us";
        const action = actions.filterReportsList(textFilter);
        const newState = sidebarReducer(initialState, action);

        //expect terms
        expect(newState.textFilter).toEqual(textFilter);
    });

    it('should set error message when fetchDataFail action is being fired', () => {
        const errorMessage = 'Problem occured while trying to fetch data';
        const action = actions.fetchDataFail(errorMessage);
        const newState = sidebarReducer(initialState, action);
        
        expect(newState.errorMessage).toEqual(errorMessage);
    });
});