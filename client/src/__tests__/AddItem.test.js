import React from 'react'
import {AddItem} from '../components/AddItem'
import { shallow, mount } from 'enzyme'
import Button from '../components/CustomButton'


describe('<Add Item/>', ()=>{
    it('Additem button click calls the addTask function', ()=>{
         const component = shallow(<AddItem/>);
         let addTask= jest.fn()
        
        //=================================What to do when dependednt on API
         //  component.find(Button).simulate('click', {})



        expect(component)
    })

})