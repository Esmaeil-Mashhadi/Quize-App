import React from 'react'
import Headers from './Header'
import Footer from './Footer'

function Layout({children}) {
  return (
    <div>
        <Headers />
          <div style={{minHeight:"927px"}}>
          {children}
          </div>
        <Footer />
    </div>
  )
}

export default Layout