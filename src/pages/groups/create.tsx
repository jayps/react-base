import React from 'react';
import PrivatePage from '../../components/containers/private-page';
import GroupForm from '../../components/forms/group';

const CreateGroupPage: React.FC = () => {
    return (
        <PrivatePage>
            <div className="flex flex-col">
                <h2>Create Group</h2>
                <GroupForm />
            </div>
        </PrivatePage>
    )
}

export default CreateGroupPage;