import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Line } from 'react-chartjs-2'
import { fft, ifft } from 'fft-js'
import {fftRadix2, ifftRadix2} from '../fft/fft-r2'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

export default function Home() {
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Wave Frequency Analysis',
      },
    },
  };

  var labels = []
  var sinusoidWave = []
  for (let i = 0; i < 512; i++) {
    labels.push(i)
    sinusoidWave.push(Math.sin(3 * i / 180 * Math.PI ) + Math.sin(i / 180 * Math.PI ))
  }
  let dataR2 = fftRadix2(sinusoidWave)
  let dataIR2 = ifftRadix2(dataR2)
  

  let dataF = fft(sinusoidWave)

  console.log(dataF, dataR2)

const data = {
          labels,
        datasets: [
          {
            label: 'Fourier Frequency',
            data: dataR2.map(e => Math.sqrt(e[0] * e[0] + e[1] * e[1])),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          // {
          //   label: 'Dataset 1',
          //   data: dataF.map(e => Math.sqrt(e[0] * e[0] + e[1] * e[1])),
          //   borderColor: 'rgb(255, 255, 132)',
          //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
          // },
          {
            label: 'Sinusoid Wave',
            data: sinusoidWave.map(e => e * 128),
            borderColor: 'rgb(110, 99, 252)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          // {
          //   label: 'trus 1',
          //   data: daaaz.map(e => -e[0] * 128),
          //   borderColor: 'rgb(40, 252, 10)',
          //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
          // },
          
        ],
      }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Line data={data} options={options} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
