import React, { useContext } from "react";
import Calendar from "../assets/calendar.svg";
import Minus from "../assets/minus-circle.svg";
import Plus from "../assets/plus-circle.svg";
import Coin from "../assets/coin2.svg";
import "../css/TransactionDiv.css";
import { AuthContext } from '../context/auth';

export default function TransactionDiv({ ...props }) {
	const { user } = useContext(AuthContext);
	return (
		<div className='transcon'>
			<div className="transheader">
				<p className="transhead">Your Transactions</p>
				<div className="transdatediv">
					<img src={Calendar} alt="" className="transdateicon" />
					<span>14-16 Jan 2022</span>
				</div>
			</div>
			{Object.keys(props).length > 0 && (
				<>
					{Object.values(props).map((value) => (
						<span>
							{
								user.user_id === value.uid ?
									value.status !== "active" ? <div className="transdiv" key={value.id}><img src={Minus} alt="" className="transicon" /><div className="transinfodiv">
										<p className="transname">{value.name}</p>
										<p className="transdateinfo">14 Jan 2022</p>
									</div><p className="minustrans">-{value.reputation}<img src={Coin} alt="" className="transcoinicon" /></p></div> : <></>
									: value.status === "completed" ? <div className="transdiv" key={value.id}><img src={Plus} alt="" className="transplusicon" /><div className="transinfodiv">
										<p className="transname">{value.name}</p>
										<p className="transdateinfo">14 Jan 2022</p>
									</div><p className="plustrans">+{value.reputation}<img src={Coin} alt="" className="transcoinicon" /></p></div> : <></>
							}
						</span>
					))}
				</>
			)}
		</div>
	);
}
