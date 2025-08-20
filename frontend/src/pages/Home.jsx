import React from 'react'
import { Hero, WhyUs, Navbar, Footer } from "../import-export/ImportExport";

function Home() {
    return (
        <>  
            <Navbar />
            <Hero />
            <WhyUs />
            <Footer />
        </>
    )
}

export default Home;