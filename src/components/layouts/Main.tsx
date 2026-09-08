import {  useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Content from './Content'

export default function Main() {
   
    const [open, setOpen] = useState(true)
    return (
        <div className='flex min-h-screen w-full overflow-x-hidden'>
            <Sidebar open={open} setOpen={setOpen} />
            <div className='flex-1 flex flex-col min-w-0'>
                <Header />
                <main className='flex-1'>
                    <Content />
                </main>
            </div>
        </div>
    )
}
