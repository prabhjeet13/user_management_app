// import React, { useCallback, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import toast from 'react-hot-toast';
// import { setUsers } from '../slices/ProfileSlice';
// import axios from 'axios';
// import { Node, MiniMap, Controls, Background, Handle, ReactFlow, useNodesState, addEdge} from '@xyflow/react';
// import '@xyflow/react/dist/style.css';

// const MainContent = () => {
//   const { users } = useSelector((state) => state.profile);
//   const dispatch = useDispatch();

//   const [flow_nodes, set_flow_nodes,onNodesChange] = useNodesState([]);
//   const [edge, setedge,onEdgesChange] = useNodesState([]);

//   const generate_nodes_edges = (users) => {
          
//             let nodes = [];
//             let edges = [];
//             users.forEach((user, index) => {
//               const userId = `user-${user.id}`;
//               const parent_node = {
//                 id: userId,
//                 type: 'default',
//                 position: { x: 30, y: (index+1)*100 },
//                 data: {
//                   label: `${user.username} (Age: ${user.age})`,
//                 },
//               };
//               nodes.push(parent_node);
              
//               user.hobbies.map((hobby,index) => {
//                     const hobbyId = `${userId}-hobby-${index+1}`;
//                     const hobby_node = {
//                       id : hobbyId,
//                       type: 'default',
//                       position : {x: parent_node.position.x + (index+1) * 200, y : (parent_node.position.y + -(index+1) * 20)},
//                       data: {
//                         label : `${hobby}`,
//                       }
//                     }
//                     nodes.push(hobby_node);

//                     const ed = {
//                             id : `${userId} - ${hobbyId}`,
//                             source: `${userId}`,
//                             target : `${hobbyId}`,
//                             animated : true
//                     }
//                     edges.push(ed);
                    
//             });});
//             set_flow_nodes(nodes);
//             setedge(edges);
//   }
  
//   useEffect(() => {
//     const fetch = async () => {
//       const toastId = toast.loading('Loading data...');
//       try {
//         const response = await axios.get('http://localhost:4001/api/v1/users/getallusers');
//         if (!response.data.success) {
//           throw new Error('Unable to fetch users');
//         } else {
//           localStorage.setItem('users', JSON.stringify(response.data.users));
//           dispatch(setUsers(response.data.users));
//           generate_nodes_edges(response.data.users);
//           toast.success('Data fetched successfully!');
//         }
//       } catch (error) {
//         toast.error('Server down, try again later');
//       }
//       toast.dismiss(toastId);
//     };
//     fetch();
//   }, [dispatch]);


//   const onConnect = useCallback((connection) => {
//     const newEdge = { ...connection, animated: true, id: `edge-${edge.length + 1}` };
//     setedge((prevEdges) => [...prevEdges, newEdge]);
//   },[edge])


//   if (!users) {
//     return (
//       <div className="flex items-center justify-center text-white w-[82%] min-h-screen p-4 m-4 font-bold text-3xl">
//         No Users Found
//       </div>
//     );
//   }

//   return (
//     <div className="w-[82%] h-[90vh] p-4 m-4 bg-gray-100 text-black font-mono font-semibold">
//       <ReactFlow nodes ={flow_nodes}  edges={edge} onEdgesChange = {onEdgesChange} onNodesChange = {onNodesChange} onConnect={onConnect}>
//         <Background/> 
//         <Controls/>
//         <MiniMap/>
//       </ReactFlow>
//     </div>
//   );
// };

// export default MainContent;

import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setUsers } from '../slices/ProfileSlice';
import axios from 'axios';
import { Node, MiniMap, Controls, Background, Handle, ReactFlow, useNodesState, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useNavigate } from 'react-router-dom';

const MainContent = () => {
  const { users } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [flow_nodes, set_flow_nodes, onNodesChange] = useNodesState([]);
  const [edge, setedge, onEdgesChange] = useNodesState([]);

  const generate_nodes_edges = (users) => {
    let nodes = [];
    let edges = [];
    users.forEach((user, index) => {
      const userId = `user-${user.id}`;
      const parent_node = {
        id: userId,
        type: 'input',
        position: { x: 30, y: (index + 1) * 100 },
        data: {
          label: `${user.username} (Age: ${user.age})`,
        },
      };
      nodes.push(parent_node);

      user.hobbies.map((hobby, index) => {
        const hobbyId = `${userId}-hobby-${hobby}`;
        const hobby_node = {
          id: hobbyId,
          type: 'default',
          position: { x: parent_node.position.x + (index + 1) * 200, y: parent_node.position.y + -(index + 1) * 20 },
          data: {
            label: `${hobby}`,
          },
        };
        nodes.push(hobby_node);
        const ed = {
          id: `${userId} - ${hobbyId}`,
          source: `${userId}`,
          target: `${hobbyId}`,
          animated: true,
        };
        edges.push(ed);
      });
    });
    set_flow_nodes(nodes);
    setedge(edges);
  };

  const onRemoveHobby = async (userId, hobby) => {
    const  idarr = userId.split('-');
    const id = idarr[1] + '-' + idarr[2] + '-' + idarr[3] + '-' + idarr[4] + '-' + idarr[5]
      set_flow_nodes((prevNodes) => prevNodes.filter(node => node.userId !== `${userId}-hobby-${hobby}`));
      setedge((prevEdges) => prevEdges.filter(edge => edge.source !== id || edge.target !== `${userId}-hobby-${hobby}`));

    const toastid = toast.loading('wait .... ');
    try {
      const response = await axios.post(`https://user-management-app-06rt.onrender.com/api/v1/users/delete_hobby/${id}`,{hobby});
      if(!response.data.success)
      {
         throw new Error('not able to do');
      }else {
        dispatch(setUsers(response.data.users));
        localStorage.setItem('users',JSON.stringify(response.data.users));
        toast.success('hobby delete successfully!');
        navigate('/all-user');
      }
    }catch(error)
    {
      toast.error('server down try again later');
    }
    toast.dismiss(toastid);  
    console.log(id,hobby);
  };

  const handleDrop = async(e,userId) => {
      e.preventDefault();
      const parentIndx = flow_nodes.findIndex((node) => node.id === userId);
      const  idarr = userId.split('-');
      const id = idarr[1] + '-' + idarr[2] + '-' + idarr[3] + '-' + idarr[4] + '-' + idarr[5]
      const userindex = users.findIndex((user) => user.id === id);
      const index = users[userindex].hobbies.length
      const hobby = e.dataTransfer.getData('hobby');
      const hobbyId = `${userId}-hobby-${hobby}`;
      const hobby_node = {
        id: hobbyId,
        type: 'default',
        position: { x: flow_nodes[parentIndx].position.x + ( index + 1) * 200, y: flow_nodes[parentIndx].position.y + -(index + 1) * 20 },
        data: {
          label: `${hobby}`,
        },
      }
      const ed = {
        id: `${userId} - ${hobbyId}`,
        source: `${userId}`,
        target: `${hobbyId}`,
        animated: true,
      };

      set_flow_nodes((prevNodes) => [...prevNodes, hobby_node]);
      setedge((prev) => [...prev, ed]);

      //database - calling
      const toastid = toast.loading('wait .... ');
    try {
      const response = await axios.post(`https://user-management-app-06rt.onrender.com/api/v1/users/add_hobby/${id}`,{hobby});
      if(!response.data.success)
      {
         throw new Error('not able to do');
      }else {
        dispatch(setUsers(response.data.users));
        localStorage.setItem('users',JSON.stringify(response.data.users));
        toast.success('hobby added successfully!');
        navigate('/all-user');
      }
    }catch(error)
    {
      toast.error('server down try again later');
    }
    toast.dismiss(toastid); 

      // console.log(e,userId);
    }   

  const handleDragOver = (e) => {
      e.preventDefault(); // Allow drop
    };

  // const onConnect = useCallback((connection) => {
  //   const newEdge = { ...connection, animated: true, id: `edge-${edge.length + 1}` };
  //   setedge((prevEdges) => [...prevEdges, newEdge]);
  // }, [edge]);

  useEffect(() => {
    const fetch = async () => {
      const toastId = toast.loading('Loading data...');
      try {
        const response = await axios.get('https://user-management-app-06rt.onrender.com/api/v1/users/getallusers');
        if (!response.data.success) {
          throw new Error('Unable to fetch users');
        } else {
          localStorage.setItem('users', JSON.stringify(response.data.users));
          dispatch(setUsers(response.data.users));
          generate_nodes_edges(response.data.users);
          toast.success('Data fetched successfully!');
        }
      } catch (error) {
        toast.error('Server down, try again later');
      }
      toast.dismiss(toastId);
    };
    fetch();
  }, []);

  if (!users) {
    return (
      <div className="flex items-center justify-center text-white w-[82%] min-h-screen p-4 m-4 font-bold text-3xl">
        No Users Found
      </div>
    );
  }

  return (
    <div className="w-[82%] h-[90vh] p-4 m-4 bg-gray-100 text-black font-mono font-semibold">
      <ReactFlow nodes={flow_nodes} edges={edge} onEdgesChange={onEdgesChange} onNodesChange={onNodesChange}
       onDrop={(e) => {
          const targetNodeId = e.target.closest('.react-flow__node')?.getAttribute('data-id');
          const targetNode = flow_nodes.find((node) => node.id === targetNodeId);
          if (targetNode && targetNode.type === 'input') {
            handleDrop(e, targetNode.id);
          }else return;
        }}
       onDragOver={handleDragOver}
      >
        <Background />
        <MiniMap />
        {flow_nodes.map((node) => {
          if (node.data?.label && node.id.includes('-hobby')) {
            return (
              <button
                key={node.id}
                onClick={() => onRemoveHobby(node.id, node.data.label)} // Extract userId and hobby name from node id and label
                className="absolute bg-red-500 text-white px-2 rounded-full w-fit z-10"
                style={{ top: node.position.y + 6, left: node.position.x + 120 }}
              >
                X
              </button>
            );
          }
        })}

      </ReactFlow>
    </div>
  );
};

export default MainContent;
