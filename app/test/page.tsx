import React from 'react'
import Script from 'next/script'

const page = () => {
  return (
    <div>
      <Script src="http://localhost:3000/widget.js" data-id="33d8b7d4-ebe8-499c-8dc1-fbc6546c7e65" defer></Script>
    </div>
  )
}

export default page
