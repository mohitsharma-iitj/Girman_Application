import { useState, useEffect } from 'react';


import SearchItem from '@/components/searched_items';
import Navbar from '@/components/Navbarsearch';
import { useRouter } from 'next/router';
// import userList from '../../public/user_list.json';
export default function Home() {
    
    const router = useRouter();
    const {id} = router.query;
    

    useEffect(() => {
        const fetchUsers = async () => {
            if (id) {
                try {
                    const response = await fetch(`/api/users?searchTerm=${id}`);
                    const data = await response.json();
                    setFilteredUsers(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchUsers();
    }, [id]);


    const [filteredUsers, setFilteredUsers] = useState([]);
    return (
        <>
            {/* Navbar is placed here */}

            <div className=" bg-texture-gradient bg-texture flex flex-col items-center justify-between space-y-20 h-[100vh]">
                <Navbar searchTerm={id} />
                <div className='h-[88vh]'>

                    <SearchItem users={filteredUsers} />
                </div>


            </div>
        </>
    );
}
