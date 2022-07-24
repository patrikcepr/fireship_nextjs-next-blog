import { FC } from 'react';

const Loader: FC<{ show: boolean }> = ({ show }) => {
  return show ? <div className='loader'></div> : null;
};

export default Loader;
