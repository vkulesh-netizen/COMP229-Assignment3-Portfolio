import {render,screen} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import {it,expect} from 'vitest'
import Home from '../src/pages/Home'
it('provides working navigation targets',()=>{render(<MemoryRouter><Home/></MemoryRouter>);expect(screen.getByRole('link',{name:'View Projects'})).toHaveAttribute('href','/projects');expect(screen.getByRole('link',{name:'About Me'})).toHaveAttribute('href','/about')})
it('announces a successful contact redirect',()=>{render(<MemoryRouter initialEntries={[{pathname:'/',state:{messageSent:true}}]}><Home/></MemoryRouter>);expect(screen.getByRole('status')).toHaveTextContent('Thank you!')})
