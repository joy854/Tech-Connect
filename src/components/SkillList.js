import React from 'react';
import { SkillContext } from '../context/skills';
import Item from './SkillItem';
export default function SkillList() {
  const { skill } = React.useContext(SkillContext);
  return (
    <div>
      <ul className='list'>
        {skill.map((item) => {
          return <Item key={item.sid} title={item.title} sid={item.sid} />;
        })}
      </ul>
    </div>
  );
}
