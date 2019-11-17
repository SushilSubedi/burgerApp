import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BurgerBuilder from './BurgerBuilder';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';

configure({adapter:new Adapter});

let wrappers;
beforeEach(()=>{
    wrappers=shallow(<BurgerBuilder oninitIngredients={()=>{}}/>);
});

describe('<BurgerBuilder/>',()=>{

it('should render <BurgerBuilder/> for ingredients',()=>{
    wrappers.setProps({ing:{salad:0}});
expect(wrappers.find(BurgerControls)).toHaveLength(1);
});

})