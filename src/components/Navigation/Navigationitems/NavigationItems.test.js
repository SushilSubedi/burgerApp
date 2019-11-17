import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter:new Adapter});

let wrapper=null

beforeEach(()=>{
    wrapper=shallow(<NavigationItems/>);
})

describe('<NavigationItems/>',()=>{
    it('should render two <NavigationItem/> element if not authenticated',()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render two <NavigationItem/> element if authenticated',()=>{
            wrapper.setProps({isAuthentication:true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render two <NavigationItem/> element if authenticated',()=>{
        wrapper.setProps({isAuthentication:true});
    expect(wrapper.contains(<NavigationItem link={'/logout'}>LOGOUT</NavigationItem>
    )).toEqual(true);
});

})