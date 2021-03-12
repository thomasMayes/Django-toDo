import React from 'react'
import App from './App'
import { shallow, mount } from 'enzyme'

describe('<App/>', ()=>{
    it('renders 1 <App /> component', ()=>{
        const component = mount(<App/>);
        expect(component).toHaveLength(1)
    })

})