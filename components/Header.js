import Link from 'next/link'
import metadata from '../metadata'

export default function Header() {
  return (
    <header>
      <div className='container'>
        <Link href='/' passHref>
          <h2>{metadata.site_title}</h2>
        </Link>
      </div>
    </header>
  )
}
