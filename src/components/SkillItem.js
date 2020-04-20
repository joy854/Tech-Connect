import React from 'react';
import { SkillContext } from '../context/skills';
export default function Skill({ sid, title }) {
  const { handleDelete } = React.useContext(SkillContext);
  return (
    // <div>
    //   <div>
    //     <input type='text' value={singleSkill} onChange={handleSingleSkill} />
    //     <input
    //       type='button'
    //       value='Add'
    //       className='btn btn-primary'
    //       onClick={() => handleAdd(sid)}
    //     />
    //     {/* Add */}
    //     {/* </button> */}
    //     <input
    //       type='button'
    //       value='Delete'
    //       className='btn btn-primary'
    //       onClick={() => handleDelete(sid)}
    //     />
    //   </div>
    // </div>
    <li className='item'>
      <div className='info'>
        <span className='title'>{title}</span>
      </div>
      <div>
        <input
          type='button'
          value='Delete'
          className='clear-btn btn btn-primary'
          aria-label='delete button'
          onClick={() => handleDelete(sid)}
        />
        {/* <MdDelete /> */}
      </div>
    </li>
  );
}
