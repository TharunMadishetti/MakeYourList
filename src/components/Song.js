import React from 'react'
export const List = (props) => {
    const list=props.list;
    return (
    <>
        <p><a className='bg-white px-5 rounded-xl ' href={'https://open.spotify.com/playlist/'+list.id+'?si='+list.snapshot_id} target='blank'>{list.name}</a></p>
    </>
  )
}

