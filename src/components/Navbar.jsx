import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-violet-700 text-white'>
        <div className="logo my-2">
            <span className='font-bold text-xl mx-8'>iTask</span>
        </div>
      <ul className="flex gap-8 mx-9 my-2">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>About</li>
      </ul>
    </nav>
  )
}

export default Navbar
