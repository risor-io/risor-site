import { useId } from 'react';
import styles from './features.module.css';
// import useLocalesMap from './use-locales-map';
// import { featuresMap, titleMap } from '../translations/text';

import CloudIcon from '../components/icons/cloud';
import DatabaseIcon from '../components/icons/database';
import CodeBracketIcon from '../components/icons/code-bracket';
import CommandLineIcon from '../components/icons/command-line';
import BoltIcon from '../components/icons/bolt';
import CogIcon from '../components/icons/cog';
import HandThumbUpIcon from '../components/icons/hand-thumb-up';
import GlobeAltIcon from '../components/icons/globe-alt';

export function Feature({ text, icon }) {
  return (
    <div className={styles.feature}>
      {icon}
      <h4>{text}</h4>
    </div>
  );
}

/** @type {{ key: string; icon: React.FC }[]} */
const FEATURES_LIST = [
  { key: 'Cloud Ready', icon: <CloudIcon /> },
  { key: 'Database Queries', icon: <DatabaseIcon /> },
  { key: 'Friendly Syntax', icon: <CodeBracketIcon /> },
  { key: 'Pipelines', icon: <BoltIcon /> },
  { key: 'Powerful CLI', icon: <CommandLineIcon /> },
  { key: 'Great Builtins', icon: <CogIcon /> },
  { key: 'Single Binary', icon: <HandThumbUpIcon /> },
  { key: 'JSON & HTTP', icon: <GlobeAltIcon /> },
];

export default function Features() {
  const keyId = useId();
  //   const title = useLocalesMap(titleMap);
  //   const features = useLocalesMap(featuresMap);

  return (
    <div className={styles.features}>
      {FEATURES_LIST.map(({ key, icon }) => (
        <Feature text={key} icon={icon} key={keyId + key} />
      ))}
    </div>
  );
}
