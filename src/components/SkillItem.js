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
      <div
        className='row orientation'
        style={{ width: '50%', padding: '1%', textAlign: 'left' }}
      >
        <div
          className='col-md-8'
          style={{ height: '100%', overflow: 'hidden' }}
        >
          {/* <div className='title' style={{ paddingTop: '2%' }}> */}
          {title}
          {/* </div> */}
        </div>
        <div className='col-md-4'>
          <input
            type='button'
            value='Delete'
            className='BUTTON_LAI'
            aria-label='delete button'
            onClick={() => handleDelete(sid)}
          />
          {/* <MdDelete /> */}
        </div>
      </div>
    </li>
  );
}
