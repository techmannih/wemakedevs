import clsx from 'clsx';
import { BsCalendar, BsClock } from 'react-icons/bs';

import styles from './index.module.css';

import { webinar } from '@/content/Webinars/index.content';

import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';

const Upcoming = () => {
  return (
    <section id='upcoming'>
      <div className={clsx('layout', styles.layout)}>
        <h2 className='h1'>Upcoming webinars</h2>
        <hr className={clsx('styled-hr', styles.hr)} />

        <div className={styles.cardsContainer}>
          {webinar.filter(
            (web) => new Date().getTime() < new Date(web.time).getTime()
          ).length > 0 ? (
            webinar
              .filter(
                (web) => new Date().getTime() < new Date(web.time).getTime()
              )
              .map((web) => <Card {...web} key={web.image} />)
          ) : (
            <p>There no upcoming events right now</p>
          )}
        </div>
      </div>
    </section>
  );
};
export default Upcoming;

export const Card = ({ img, title, time, description, slug }) => {
  return (
    <div className={styles.card}>
      <section>
        <img src={img} alt={title + 'banner'} />
        <div className={styles.cardDetails}>
          <h3>{title}</h3>
          <p
            style={{
              marginTop: '1.3rem',
            }}
          >
            {description}
          </p>
          <p
            style={{
              marginTop: '1.3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '.5rem',
            }}
            className='h2'
          >
            <BsCalendar /> {new Date(time).toDateString()}
          </p>
          <p
            style={{
              marginTop: '1.3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '.5rem',
            }}
            className='h2'
          >
            <BsClock /> {new Date(time).toLocaleTimeString()}{' '}
            {/\((.*)\)/
              .exec(new Date(time).toString())[1]
              .split(' ')
              .map((i) => i[0].toUpperCase())
              .join('')}
          </p>
          <ArrowLink
            as={ButtonLink}
            className={styles.btn1}
            href={`/webinars/${slug}`}
            openNewTab
          >
            {new Date().getTime() < new Date(time).getTime()
              ? 'Register'
              : 'Recap'}
          </ArrowLink>
        </div>
      </section>
    </div>
  );
};