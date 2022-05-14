import Layout from '../components/master/Layout'
import React, { useState, useEffect } from 'react'
import { DataProvider } from '../store/GlobalState' 

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  // useEffect(() => {
  //   setShowChild(true);
  // }, []);

  // if (!showChild) {
  //   return null;
  // }

  // if (typeof window === 'undefined') {
  //   return <></>;
  // } else {
    return( <DataProvider><Layout>
      <Component {...pageProps} />
    </Layout></DataProvider>);
  //}


}

export default MyApp
