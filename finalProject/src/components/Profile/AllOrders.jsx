// import React from 'react'
// import { AiOutlineArrowRight } from 'react-icons/ai';
// import { Link } from 'react-router-dom';
// // import { Button, Table, TableCell, TableRow } from '@material-ui/core';
// // import MUIDataTable from "mui-datatables";

// const AllOrders = () => {

//   // const orders =[
//   //   {
//   //     _id:"4322fadfj3212312",
//   //     orderItems:[
//   //       {
//   //         name:"plain furniture",
//   //       },
//   //     ],
//   //     totalPrice:129,
//   //     orderStatus:"Processing",
//   //   },
//   // ];

//   // const columns = [
//   //   { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

//   //   {
//   //     field: "status",
//   //     headerName: "Status",
//   //     minWidth: 130,
//   //     flex: 0.7,
//   //     cellClassName: (params) => {
//   //       return params.getValue(params.id, "status") === "Delivered"
//   //         ? "greenColor"
//   //         : "redColor";
//   //     },
//   //   },
//   //   {
//   //     field: "itemsQty",
//   //     headerName: "Items Qty",
//   //     type: "number",
//   //     minWidth: 130,
//   //     flex: 0.7,
//   //   },

//   //   {
//   //     field: "total",
//   //     headerName: "Total",
//   //     type: "number",
//   //     minWidth: 130,
//   //     flex: 0.8,
//   //   },

//   //   {
//   //     field: " ",
//   //     flex: 1,
//   //     minWidth: 150,
//   //     headerName: "",
//   //     type: "number",
//   //     sortable: false,
//   //     renderCell: (params) => {
//   //       return (
//   //         <>
//   //           <Link >
//   //             <Button>
//   //               <AiOutlineArrowRight size={20} />
//   //             </Button>
//   //           </Link>
//   //         </>
//   //       );
//   //     },
//   //   },
//   // ];

//   // const row = [];
//   // orders && orders.forEach((item)=>{
//   //   row.push({
//   //     id: item._id,
//   //     itemsQty: item.orderItems.length,
//   //     total:"US$" + item.totalPrice,
//   //     status : item.orderStatus,

//   //   })
//   // })




//   const columns = ["Name", "Company", "City", "State"];

// const data = [
//  ["Joe James", "Test Corp", "Yonkers", "NY"],
//  ["John Walsh", "Test Corp", "Hartford", "CT"],
//  ["Bob Herm", "Test Corp", "Tampa", "FL"],
//  ["James Houston", "Test Corp", "Dallas", "TX"],
// ];

// const options = {
//   filterType: 'checkbox',
// };



//   return (
//     <div className='pl-8 pt-1'>
       

//        <MUIDataTable
//   title={"Employee List"}
//   data={data}
//   columns={columns}
//   options={options}
// />



   
    

//     </div>
//   )
// }

// export default AllOrders
