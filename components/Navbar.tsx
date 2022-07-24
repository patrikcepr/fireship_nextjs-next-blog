import Link from 'next/link';
import Image from 'next/image';
import { Fragment, useContext } from 'react';
import { UserContext } from '../lib/context';

//top navbar
const Navbar = () => {
  const { user, username } = useContext(UserContext);

  return (
    <nav className='navbar'>
      <ul>
        <li>
          <Link href='/' passHref>
            <button className='btn-logo'>FEED</button>
          </Link>
        </li>
        {/* user is logged in */}
        {username && (
          <Fragment>
            <li className='push-left'>
              <Link href='/admin' passHref>
                <button className='btn-blue'>Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`} passHref>
                <a>
                  {user && (
                    <Image
                      src={user.photoURL!}
                      alt={user.displayName!}
                      width='48px'
                      height='48px'
                    />
                  )}
                </a>
              </Link>
            </li>
          </Fragment>
        )}
        {/* user is not logged in */}
        {!username && (
          <li>
            <Link href='/enter' passHref>
              <button className='btn-blue'>Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
