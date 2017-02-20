import expect from 'expect';
import {
    FETCH_SIDEBARDATA_ERROR, 
    PRE_FETCH_SIDEBARDATA, 
    FETCH_SIDEBARDATA_SUCCESS,
    fetchSidebarData,
    fetchDataSuccess,
    AddTimeTextToItems
} from './SidebarActions';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

describe('sidebar Actions', () => {
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

    describe('action creators test ', () => {
        it('should create FETCH_SIDEBARDATA_SUCCESS action', () => {
            const expectedAction = {
                type: FETCH_SIDEBARDATA_SUCCESS, 
                payload: reportsArr
            };

            const action = fetchDataSuccess(reportsArr);
            
            //expect terms
            expect(action).toEqual(expectedAction);
        });
    });

    describe('test AddTimeTextToItems function', () => {
        const initialData = [{
            "id": 439,
            "name": "My http test with Code Pipeline",
            "created": 1437299328,
            "updated": 1437308804,
            "location": "us-east-1",
            "type": "http"
        }];

        const expectedData = [{
            "id": 439,
            "name": "My http test with Code Pipeline",
            "created": 1437299328,
            "updated": 1437308804,
            "updatedText": {date:"Jan 06", time: "17:15"},
            "location": "us-east-1",
            "type": "http"
        }];

        let dataWithAddition = AddTimeTextToItems(initialData);

        //expect terms
        expect(dataWithAddition[0]).toEqual(expectedData[0]);
    });

    describe('Test async calls', () => {
        const middleware = [thunk];
        const mockStore  = configureMockStore(middleware);

        afterEach(() => {
            nock.cleanAll();
        });

        it('should create PRE_FETCH_SIDEBARDATA and FETCH_SIDEBARDATA_ERROR - when Error occures', () => {
            nock('http://localhost:3000')
                .get('/sidebar.json')
                .reply(500, {body: {data: reportsArr}});

            const expectedActions = [
                {type: PRE_FETCH_SIDEBARDATA},
                {type: FETCH_SIDEBARDATA_ERROR, payload: "Error while fetching data"}
            ];
            
            const store = mockStore({data: reportsArr});

            store.dispatch(fetchSidebarData())
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                });
        });
    });
   
});