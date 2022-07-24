import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../components/Loader';

const Home = (show: false) => {
  return (
    <div>
      <Loader show />
      <button onClick={() => toast.success('Succes')}>Toast me</button>
    </div>
  );
};

export default Home;
