"use client";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./page.module.css";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";

const NotesClient = () => {
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [isOpen, setIsOpen] = useState(false);
	const [debouncedQuery] = useDebounce(query, 300);

	const { data, isSuccess } = useQuery({
		queryKey: ["notes", debouncedQuery, page],
		queryFn: () => fetchNotes(debouncedQuery, page),
		placeholderData: keepPreviousData,
		refetchOnMount: false,
	});

	const handleSearch = (value: string) => {
		setQuery(value);
		setPage(1);
	};

	return (
		<div className={css.app}>
			<div className={css.toolbar}>
				<SearchBox onChange={handleSearch} />
				{isSuccess && data.totalPages > 1 && (
					<Pagination
						totalPages={data.totalPages}
						page={page}
						onPageChange={setPage}
					/>
				)}

				<button onClick={() => setIsOpen(true)} className={css.button}>
					Create note +
				</button>
			</div>
			{data && data.notes.length > 0 && <NoteList notes={data.notes} />}

			{isOpen && (
				<Modal onClose={() => setIsOpen(false)}>
					<NoteForm onClose={() => setIsOpen(false)} />
				</Modal>
			)}
		</div>
	);
};

export default NotesClient;
