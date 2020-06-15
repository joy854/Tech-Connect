import React from 'react';
import { FilteredUserContext } from '../context/filteredusers';

export default function Filters() {
  const { name, category, setName, setCategory } = React.useContext(
    FilteredUserContext
  );
  return (
    <div
      className='orientation'
      style={{
        width: '70%',
        margin: 'auto',
        border: ' 2px solid white',
      }}
    >
      <form>
        {/* search input */}
        <div className='form-group'>
          <label htmlFor='name'>Search name</label>
          <input
            type='text'
            name='name'
            id='name'
            className='form-control'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* end of search form */}

        <div className='form-group'>
          <label htmlFor='category'>Institute</label>
          <select
            name='category'
            id='category'
            className='form-control'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value='all'>All</option>
            <option value='iit'>IIT</option>
            <option value='nit'>NIT</option>
            {/* <option value='others'>Others</option> */}
          </select>
        </div>
        {/* end of category */}
      </form>
    </div>
  );
}
