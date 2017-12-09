import React from 'react';
import { observer, inject } from 'mobx-react';


const RoomList = inject('roomListStore')(observer(
    ({roomListStore}) => (
        <div>
            <h2> RoomList </h2>

            <ul>
                {roomListStore.rooms.map(e => {
                    return (
                        <li key={e._id}> 
                            {e.mentor} {e.teamname} {e.subject} {e.description}
                        </li>
                    )
                })}
            </ul>
           
        </div>
    )
));

export default RoomList;

const style = {
}
