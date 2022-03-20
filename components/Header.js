import Link from 'next/link'
import metadata from '../metadata'

export default function Header() {
  return (
    <header>
      <div className='container'>
        <Link href='/' passHref>
          <h2 style={{ cursor: "pointer" }}>{metadata.site_title}</h2>
        </Link>
      </div>
    </header>
  )
}
