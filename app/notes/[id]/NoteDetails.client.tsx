"use client";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./page.module.css";
import Loading from "@/app/loading";

const NoteDetailsClient = () => {
	const { id } = useParams<{ id: string }>();
	const { data, isLoading, error } = useQuery({
		queryKey: ["note", id],
		queryFn: () => fetchNoteById(id),
		refetchOnMount: false,
	});
	if (isLoading) {
		return <Loading />;
	}
	if (error || !data) {
		return <p>Something went wrong.</p>;
	}

	return (
		<div className={css.container}>
			<div className={css.item}>
				<div className={css.header}>
					<h2>{data.title}</h2>
				</div>
				<p className={css.content}>{data.content}</p>
				<p className={css.date}>
					{new Date(data.createdAt).toLocaleString()}
				</p>
			</div>
		</div>
	);
};

export default NoteDetailsClient;
