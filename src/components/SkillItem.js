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
    <li className='item' style={{}}>
      <div className='container-fluid' style={{ width: '70%' }}>
        <div
          className='row post-item-container'
          style={{
            padding: '1.5%',
            textAlign: 'left',
            // marginRight: '0',
            // marginLeft: '3%',
            left: '0',
            overflowWrap: 'break-word',
          }}
        >
          <div className='col-md-8' style={{}}>
            {/* <div className='title' style={{ paddingTop: '2%' }}> */}
            {title}
            {/* </div> */}
          </div>
          <div className='col-md-4'>
            <input
              type='button'
              value='Delete'
              className='BUTTON_LAI'
              style={{ float: 'right', marginLeft: '0' }}
              // aria-label='delete button'
              onClick={() => handleDelete(sid)}
            />
            {/* <MdDelete /> */}
          </div>
        </div>
      </div>
    </li>
  );
}
