import React from 'react'

import Logo from './Logo';
import HeaderNavBar from './HeaderNavBar';
export default function Header() {    
  return (   
    <header>
         <section id="hpart1">
           <div className="container">
              <Logo />
             <HeaderNavBar />
           </div>
        </section>
     </header>
  );
}
