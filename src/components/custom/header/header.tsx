'use client'
import Navbar from './navbar'
import SecondaryHeader from './secondary-header'



const Header = () => {
  return (
    // <header className=" bg-transparent shadow-sm h-[70px]">
    //   <SecondaryHeader />
    //   <Navbar />
    // </header>
     <header className=" h-[70px]">
      <SecondaryHeader />
      <Navbar />
    </header>
  )
}

export default Header