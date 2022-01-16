import React from "react";
import "../css/topnav.css";
import Model from "./Modal";

const Topnav = ({ ...props }) => {
	return (
		<div className='topnav'>
			<div className='topnav__search'>
				<button
					className='topnav-btn'
					data-bs-toggle='modal'
					data-bs-target='#createModal'>
					CREATE LIST
				</button>
				<Model props={props} />
			</div>
		</div>
	);
};

export default Topnav;
