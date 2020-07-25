import React from 'react'
import Link from 'next/link'

const IndexPage = () => {
  return (
    <div>
      <h1>Index Page</h1>
      <ul>
        <li>
          <Link href="/sender">
            <a>Sender</a>
          </Link>
        </li>
        <li>
          <Link href="/receiver">
            <a>Receiver</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default IndexPage
