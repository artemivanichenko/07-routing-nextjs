"use client";

import { tags } from "@/types/note";
import css from "./TagsMenu.module.css";
import Link from "next/link";
import { useState } from "react";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

const TagsMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	return (
		<div className={css.menuContainer}>
			<button onClick={toggle} className={css.menuButton}>
				Notes
				{isOpen ?
					<FaCaretUp />
				:	<FaCaretDown />}
			</button>
			{isOpen && (
				<ul className={css.menuList}>
					{tags.map((tag) => (
						<li key={tag} className={css.menuItem}>
							<Link
								onClick={toggle}
								href={`/notes/filter/${tag}`}
								className={css.menuLink}>
								{tag}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default TagsMenu;
