import React from 'react';
import { SkillContext } from '../context/skills';
export default function SkillForm() {
  const {
    handleAdd,
    singleSkill,
    // setSingleSkill,
    handleSingleSkill,
  } = React.useContext(SkillContext);
  return (
    <form onSubmit={handleAdd}>
      <div className='form-center'>
        <div className='form-group'>
          <label htmlFor='skill' style={{ textAlign: 'left' }}>
            Skills
          </label>
          <input
            type='text'
            className='form-control'
            id='skill'
            name='skill'
            placeholder='e.g. HTML'
            value={singleSkill}
            onChange={handleSingleSkill}
          />
        </div>
        <button type='submit' className='BUTTON_LAI'>
          {/* <MdSend className='btn-icon' /> */}
          Add
        </button>
      </div>
    </form>
  );
}
