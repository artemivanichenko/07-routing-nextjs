import css from "./SidebarNotes.module.css";
import { tags } from "@/types/note";

const SidebarNotes = () => {
	return (
		<div>
			{" "}
			<ul className={css.menuList}>
				{tags.map((tag) => (
					<li key={tag} className={css.menuItem}>
						<a href={`/notes/filter/${tag}`} className={css.menuLink}>
							{tag}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SidebarNotes;
