import React from 'react';
import uuid from 'uuid/v4';

const SkillContext = React.createContext();
function SkillProvider({ children }) {
  //   const id = uuid();
  //   const [sid, setSid] = React.useState(id);
  const [skill, setSkill] = React.useState([]);
  const [singleSkill, setSingleSkill] = React.useState('');
  const handleSingleSkill = (e) => {
    // e.preventDefault();
    setSingleSkill(e.target.value);
    // console.log(singleSkill);
  };
  const handleDelete = (sid) => {
    const newSkill = skill.filter((item) => item.sid !== sid);
    setSkill(newSkill);
    console.log(skill);
  };
  const handleAdd = (e) => {
    e.preventDefault();
    //   if(!singleSkill) alert
    // const newSkill = skill.map((item) => {
    //   if (item.id === sid) item.title = singleSkill;
    //   return item;
    // });

    const newitem = {
      sid: uuid(),
      title: singleSkill,
    };
    setSkill([...skill, newitem]);
    setSingleSkill('');
    console.log(skill);
  };
  return (
    <SkillContext.Provider
      value={{
        skill,
        // sid,
        singleSkill,
        handleSingleSkill,
        // setSingleSkill,
        handleAdd,
        handleDelete,
      }}
    >
      {children}
    </SkillContext.Provider>
  );
}
export { SkillProvider, SkillContext };
